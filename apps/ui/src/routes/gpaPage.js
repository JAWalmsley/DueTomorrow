import { Container, Grid } from '@mui/material';
import { CourseList, GPATally } from '../components/gpa.js';
import { Navbar } from '../components/navbar.js';
import React from 'react';
import '../css/styles.css';

import {
    APIAssignmentModify,
    APIAssignmentsGet,
    APICoursesGet,
    APIUsernameGet,
} from '../api.js';

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
                console.log('recieved assignments', data);
            });
    }

    updateAssignment(data) {
        
        APIAssignmentModify({ ...data, userid: this.userid }).then(() => {
            let newAssignments = [...this.state.assignments].map((a) => {
                if (a.id === data.id) {
                    for (let key in data) {
                        a[key] = data[key] ?? a[key];
                    }
                }
                return a;
            });
            this.setState({ assignments: newAssignments });
        });
    }
    // eslint-disable-next-line
    updateAssignment = this.updateAssignment.bind(this);

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
                        <Grid item xs={7}>
                            <CourseList
                                courses={this.state.courses}
                                assignments={this.state.assignments}
                                updateAssignmentCallback={this.updateAssignment}
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <GPATally
                                courses={this.state.courses}
                                assignments={this.state.assignments}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}
