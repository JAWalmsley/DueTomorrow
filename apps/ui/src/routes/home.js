import { AssignmentTable } from '../components/assignments.js';
import { Navbar } from '../components/navbar.js';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import '../css/styles.css';
import { APIAssignmentsGet, APICoursesGet, APIUsernameGet, APIAssignmentDelete, APIAssignmentPost, APIAssignmentModify } from '../api.js';
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

    async updateAssignment(data) {
        await APIAssignmentModify({ ...data, userid: this.userid });
        this.setState({assignments: await APIAssignmentsGet(this.userid)});
    }
    // eslint-disable-next-line
    updateAssignment = this.updateAssignment.bind(this);
    
    async deleteAssignment(data) {
        data = {...data, userid: this.userid};
        await APIAssignmentDelete(data);
        let a = await APIAssignmentsGet(this.userid)
        this.setState({ assignments:  a}, () => console.log(this.state.assignments));
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
        await APIAssignmentPost({ ...assig, userid: this.userid });
        this.setState({assignments: await APIAssignmentsGet(this.userid)})
    }
    // eslint-disable-next-line
    createAssignment = this.createAssignment.bind(this);

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
