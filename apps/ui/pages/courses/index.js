import { Container, Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { Navbar } from '../../src/components/Navbar.js';
import { CourseList } from './components/CourseList.js';
import { CourseEntryRow } from './components/CourseEntryRow.js';
import { APICoursesDelete, APICoursesGet, APICoursesPost } from '../../src/api.js';

import React from 'react';

export default class CoursePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: this.c,
            loadedCourses: false,
        };
    }

    async setCourses() {
        // console.log(this.userid);
        let c = await APICoursesGet(this.userid);
        if (c === null) {
            window.location.replace('/login');
        } else {
            this.setState({ courses: c, loadedCourses: true });
        }
    }
    // eslint-disable-next-line
    setCourses = this.setCourses.bind(this);

    async deleteCourse(data) {
        data = { ...data, userid: this.userid };
        await APICoursesDelete(data);
        this.setState({ courses: await APICoursesGet(this.userid) });
    }
    // eslint-disable-next-line
    deleteCourse = this.deleteCourse.bind(this);

    async newCourse(data) {
        data = { ...data, userid: this.userid };
        await APICoursesPost(data);
        this.setState({ courses: await APICoursesGet(this.userid) });
    }
    // eslint-disable-next-line
    newCourse = this.newCourse.bind(this);

    componentDidMount() {
        this.userid = localStorage.getItem('userid');
        // console.log('id is' + this.userid);
        this.setCourses();
    }

    render() {
        if (!this.state.loadedCourses) {
            return <>Loading...</>;
        }
        return (
            <>
                <Navbar />
                <Container>
                    <Grid container spacing={2} padding={1}>
                        <Grid item xs={12}>
                            <Paper sx={{marginBottom: '8px'}} elevation={1}>
                                <CourseEntryRow
                                    newCourseCallback={this.newCourse}
                                    userid={this.state.userid}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={0}>
                                <CourseList
                                    courses={this.state.courses}
                                    deleteCourseCallback={this.deleteCourse}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}
