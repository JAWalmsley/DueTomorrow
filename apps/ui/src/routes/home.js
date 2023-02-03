import { AssignmentTable } from '../components/assignments.js';
import { Navbar } from '../components/navbar.js';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import '../css/styles.css';
import {
    APIAssignmentsGet,
    APICoursesGet,
    APIUsernameGet,
} from '../api.js';
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

    setAssignments() {
        APIAssignmentsGet(this.userid)
            .then((e) => {
                if (e.status === 200) {
                    return e.json();
                }
                window.location.replace('/login');
                throw new Error('Not logged in');
            })
            .then((data) => {
                this.setState({ assignments: data, loadedAssignments: true });
                console.log(data[0].due);
                console.log('recieved assignments', data);
            });
    }

    setCourses() {
        APICoursesGet(this.userid)
            .then((e) => {
                if (e.status === 200) {
                    return e.json();
                }
                window.location.replace('/login');
                throw new Error('Not logged in');
            })
            .then((data) => {
                this.setState({ courses: data, loadedCourses: true });
                console.log('recieved courses', data);
            });
    }

    setUsername() {
        APIUsernameGet(this.userid)
            .then((e) => {
                if (e.status === 200) {
                    return e.json();
                }
                window.location.replace('/login');
                throw new Error('Not logged in');
            })
            .then((data) => {
                this.setState({
                    username: data.username,
                    loadedUsername: true,
                });
                console.log('recieved username', data);
            });
    }

    componentDidMount() {
        this.userid = localStorage.getItem('userid');
        this.setAssignments();
        this.setCourses();
        this.setUsername();
    }

    render() {
        // if (this.userid == null) {
        //     window.location.replace('/login');
        // }
        if (!(this.state.loadedAssignments && this.state.loadedCourses)) {
            return <>Loading...</>;
        }
        return (
            <>
                <Navbar username={this.state.username} />
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
