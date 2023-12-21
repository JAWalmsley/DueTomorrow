import { Container, Grid } from '@mui/material';
import { CourseList } from './components/GPACourseList.js';
import { GPATally } from './components/GPATally.js';
import { Navbar } from '../../src/components/Navbar.js';
import React from 'react';

import {
    APIAssignmentModify,
    APIAssignmentsGet,
    APICoursesGet,
    APIUsernameGet,
} from '../../src/api.js';

export default class GPAPage extends React.Component {
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

    async updateAssignment(data) {
        let m = await APIAssignmentModify({ ...data, userid: this.userid });
        if (m === 200) {
            await this.setAssignments();
        } else {
            console.log('Error updating assignment');
        }
    }
    // eslint-disable-next-line
    updateAssignment = this.updateAssignment.bind(this);

    async setAssignments() {
        let a = await APIAssignmentsGet(this.userid);
        if (a === null) {
            window.location.replace('/login');
        } else {
            this.setState({ assignments: a, loadedAssignments: true });
        }
    }

    async setCourses() {
        let c = await APICoursesGet(this.userid);
        if (c === null) {
            window.location.replace('/login');
        } else {
            this.setState({ courses: c, loadedCourses: true });
        }
    }

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
        this.setCourses();
        this.setAssignments();
        this.setUsername();
    }

    render() {
        if (!(this.state.loadedCourses && this.state.loadedAssignments)) {
            return <>Loading...</>;
        }
        return (
            <>
                <Navbar />
                <Container>
                    <Grid container spacing={2} padding={1}>
                        <Grid item lg={5} xs={12}>
                            <GPATally
                                courses={this.state.courses}
                                assignments={this.state.assignments}
                            />
                        </Grid>
                        <Grid item lg={7} xs={12}>
                            <CourseList
                                courses={this.state.courses}
                                assignments={this.state.assignments}
                                updateAssignmentCallback={this.updateAssignment}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}
