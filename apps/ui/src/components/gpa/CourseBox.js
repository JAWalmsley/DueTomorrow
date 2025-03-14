import {
    Card,
    CardContent, Table,
    TableBody, TableHead,
    Collapse,
    CardHeader,
    IconButton,
    CardActions
} from '@mui/material';
import React, { useState } from 'react';
import { GradeRow } from './GradeRow';
import { CourseHeader } from './CourseHeader';
import { ExpandLess, ExpandMore, MoreVert } from '@mui/icons-material';

/**
 * Box containing all assignments for a course
 *
 * @param {Object} assignments
 * @param {Object} course
 */

export class CourseBox extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {expanded: false}
    }
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
                <CardHeader title={this.props.course.name} subheader={this.props.course.credits + " Credits"} action={
                    <IconButton aria-label="show course" onClick={() => this.setState({expanded: !this.state.expanded})}> {this.state.expanded ? <ExpandLess/> : <ExpandMore/>}</IconButton>
                } style={{backgroundColor: this.props.course.colour}}/>
                <Collapse in={this.state.expanded}>
                <Table id={this.props.course.id} size="small">
                        <colgroup>
                            <col style={{ width: '50%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '20%' }} />
                        </colgroup>
                        <TableBody>{rows}</TableBody>
                    </Table>
                </Collapse>
                
            </Card>
        );
    }
}
