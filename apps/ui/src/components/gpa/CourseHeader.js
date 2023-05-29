import { TableCell, TableRow } from '@mui/material';
import React from 'react';

/**
 * Header of a course with title and credits
 *
 * @param {Object} course
 */

export class CourseHeader extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell className="center" size="medium">
                    {this.props.course.name}
                </TableCell>

                <TableCell className="center" size="medium">
                    {this.props.course.credits} Credits
                </TableCell>
                <TableCell />
            </TableRow>
        );
    }
}
