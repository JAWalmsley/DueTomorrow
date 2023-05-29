import { AssignmentTable } from '../components/assignments/AssignmentTable.js';
import { Navbar } from '../components/Navbar.js';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
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

const MONTH_MILIS = 1000 * 60 * 60 * 24 * 30;

/**
 * Converts a string into the nearest Date object
 * @param {string} input
 * @returns Date
 */
function parseDate(input) {
    let dateobj = new Date(input);

    dateobj.setFullYear(new Date().getFullYear());
    // If the date is more than 6 months in the future, assume it's from last year
    if (dateobj - new Date() > 6 * MONTH_MILIS) {
        dateobj.setFullYear(new Date().getFullYear() - 1);
    } else if (dateobj - new Date() < -6 * MONTH_MILIS) {
        dateobj.setFullYear(new Date().getFullYear() + 1);
    }
    return dateobj;
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
            window.location.replace('/login');
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
            window.location.replace('/login');
        } else {
            this.setState({ courses: c, loadedCourses: true });
        }
    }

    async createAssignment(assig) {
        assig.due = parseDate(assig.due).toISOString().split('T')[0];
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
            window.location.replace('/login');
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
