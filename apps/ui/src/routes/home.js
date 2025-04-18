import { AssignmentTable } from '../components/assignments/AssignmentTable.js';
import { Navbar } from '../components/Navbar.js';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import * as chrono from 'chrono-node';
import '../css/styles.css';
import {
    APIAssignmentsGet,
    APICoursesGet,
    APIUsernameGet,
    APIAssignmentDelete,
    APIAssignmentPost,
    APIAssignmentModify,
} from '../api.js';
import React from 'react';
import {
    Dialog,
    DialogActions,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
} from '@mui/material';
import { subscribeToPush } from '../pushNotifications.js';

import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

async function registerServiceWorker() {
    console.log("registering service worker");
    Notification.requestPermission();
    await serviceWorkerRegistration.register();
    navigator.serviceWorker.getRegistration('service-worker.js').then((reg) => {
        if (!reg) return;
        subscribeToPush(reg);
    });
}

export class Home extends React.Component {
    userid = '';

    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            courses: [],
            username: '',
            loadedCourses: false,
            loadedAssignments: false,
            loadedUsername: false,
        };
    }

    async setAssignments() {
        let a = await APIAssignmentsGet(this.userid);
        if (a === null) {
            window.location.replace('/welcome');
        } else {
            this.setState({ assignments: a, loadedAssignments: true });
        }
    }

    async updateAssignment(data) {
        await APIAssignmentModify({ ...data, userid: this.userid });
        this.setState({ assignments: await APIAssignmentsGet(this.userid) });
    }
    // eslint-disable-next-line
    updateAssignment = this.updateAssignment.bind(this);

    async deleteAssignment(data) {
        data = { ...data, userid: this.userid };
        await APIAssignmentDelete(data);
        let a = await APIAssignmentsGet(this.userid);
        this.setState({ assignments: a }, () =>
            console.log(this.state.assignments)
        );
    }
    // eslint-disable-next-line
    deleteAssignment = this.deleteAssignment.bind(this);

    async setCourses() {
        let c = await APICoursesGet(this.userid);
        if (c === null) {
            window.location.replace('/welcome');
        } else {
            this.setState({ courses: c, loadedCourses: true });
        }
    }

    async createAssignment(assig) {
        console.log(chrono.parseDate(assig.due));
        assig.due = chrono.parseDate(assig.due).toISOString().split('T')[0];
        try {
            await APIAssignmentPost({ ...assig, userid: this.userid });
        } catch (e) {
            console.log(e);
        }
        this.setState({ assignments: await APIAssignmentsGet(this.userid) });
    }
    // eslint-disable-next-line
    createAssignment = this.createAssignment.bind(this);

    async setUsername() {
        let u = APIUsernameGet(this.userid);
        if (u === null) {
            window.location.replace('/welcome');
        } else {
            this.setState({ username: u, loadedUsername: true });
        }
    }

    componentDidMount() {
        this.userid = localStorage.getItem('userid');
        this.setAssignments();
        this.setCourses();
        this.setUsername();
    }

    render() {
        if (!(this.state.loadedAssignments && this.state.loadedCourses)) {
            return <>Loading...</>;
        }
        if (this.state.courses.length === 0) {
            return (
                <>
                    <Navbar />
                    <Dialog
                        open={true}
                        onClose={() => window.location.replace('/courses')}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'No Courses'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                You don't have any courses yet, you'll need at
                                least one to start making assignments.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() =>
                                    window.location.replace('/courses')
                                }
                                variant="text"
                                color="secondary"
                            >
                                Courses Page
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            );
        }
        // The user is logged in so we register the push notifications and cache the pages for PWA
        registerServiceWorker();
        return (
            <>
                <Navbar />
                <Container>
                    <Grid container spacing={2} padding={1}>
                        <Grid item xs={12}>
                            <AssignmentTable
                                assignments={this.state.assignments}
                                userid={this.userid}
                                courses={this.state.courses}
                                deleteAssignmentCallback={this.deleteAssignment}
                                createAssignmentCallback={this.createAssignment}
                                updateAssignmentCallback={this.updateAssignment}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}
