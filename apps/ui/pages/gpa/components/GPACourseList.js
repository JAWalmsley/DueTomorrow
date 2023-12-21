import {
    Grid,
} from '@mui/material';
import React from 'react';
import { CourseBox } from './GPACourseBox';

export function getAssignmentsByCourse(a, course) {
    let assignments = [...a];
    return assignments.filter((a) => a.courseid === course.id);
}

/**
 * List of many courses
 *
 * @param {Object[]} courses
 */
export class CourseList extends React.Component {
    render() {
        const boxes = [];
        this.props.courses.forEach((course) => {
            boxes.push(
                <Grid item key={course.id + 'coursebox'}>
                    <CourseBox
                        assignments={getAssignmentsByCourse(
                            this.props.assignments,
                            course
                        )}
                        course={course}
                        updateAssignmentCallback={
                            this.props.updateAssignmentCallback
                        }
                    />
                </Grid>
            );
        });
        return (
            <Grid container spacing={2}>
                {boxes}
            </Grid>
        );
    }
}
