import {
    Grid,
} from '@mui/material';

import React from 'react';
import { CourseBox } from './CourseBox';
/**
 * @param {Array} courses
 */
export class CourseList extends React.Component {
    render() {
        return (
            <>
                <Grid container spacing={2} padding={1}>
                    {this.props.courses.map((course) => {
                        return (
                            <Grid item xs={12} lg={4} key={course.id}>
                                <CourseBox
                                    course={course}
                                    deleteCourseCallback={
                                        this.props.deleteCourseCallback
                                    }
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </>
        );
    }
}
