import {
    Card,
    CardContent, Table,
    TableBody, TableHead
} from '@mui/material';
import React from 'react';
import { GradeRow } from './GradeRow';
import { CourseHeader } from './CourseHeader';
import { HeaderRow } from './HeaderRow';

/**
 * Box containing all assignments for a course
 *
 * @param {Object} assignments
 * @param {Object} course
 */

export class CourseBox extends React.Component {
    render() {
        const rows = [];
        this.props.assignments.forEach((assignment) => {
            rows.push(
                <GradeRow
                    key={assignment.id}
                    assignment={assignment}
                    updateAssignmentCallback={this.props.updateAssignmentCallback} />
            );
        });
        return (
            <Card>
                <CardContent sx={{ padding: 0 }}>
                    <Table id={this.props.course.id} size="small">
                        <colgroup>
                            <col style={{ width: '50%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '20%' }} />
                        </colgroup>
                        <TableHead
                            style={{
                                backgroundColor: this.props.course.colour,
                            }}
                        >
                            <CourseHeader course={this.props.course} />
                            <HeaderRow
                                columns={['Assignment', 'Weight', 'Grade']}
                                colour={this.props.course.colour} />
                        </TableHead>
                        <TableBody>{rows}</TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}
