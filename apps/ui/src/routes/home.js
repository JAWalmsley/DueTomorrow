import { AssignmentTable } from '../components/assignments.js';
import { Navbar } from '../components/navbar.js';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import '../css/styles.css';
import { APIAssignmentsGet, APICoursesGet, APIUsernameGet } from '../api.js';
import React from 'react';

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
        if(a === null) {
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
        if(u === null) {
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
        return (
            <>
                <Navbar />
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <AssignmentTable
                                assignments={this.state.assignments}
                                userid={this.userid}
                                courses={this.state.courses}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}
