import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Delete } from '@mui/icons-material';
import Button from '@mui/material/Button';

/**
 * Row of one assignment
 * @param {Object} assignment
 */
export class AssignmentRow extends React.Component {
    render() {
        const assignment = this.props.assignment;
        let { colour, id, name, course, due, weight, done } = assignment;
        let dueDate = new Date(due);
        let dueString = dueDate.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        function handleChange(e) {
            console.log(e.target.checked);
            done = e.target.checked;
        }


        return (
            <>
                <TableRow key={id} sx={{ backgroundColor: colour }}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{course}</TableCell>
                    <TableCell>{dueString}</TableCell>
                    <TableCell>{weight}</TableCell>
                    <TableCell>
                        <Checkbox
                            key={Math.random()}
                            defaultChecked={!!done}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </TableCell>
                    <TableCell>
                        <Button><Delete /></Button>
                    </TableCell>
                </TableRow>
            </>
        );
    }
}

/**
 * Header of a table
 * @param columns
 */
export class HeaderRow extends React.Component {
    render() {
        const cells = [];
        this.props.columns.forEach((column) => {
            cells.push(
                <TableCell key={column} className="center-align">
                    <b>{column}</b>
                </TableCell>
            );
        });
        return (
            <TableHead>
                <TableRow>{cells}</TableRow>
            </TableHead>
        );
    }
}

export class AssignmentTable extends React.Component {
    render() {
        let rows = [];
        this.props.assignments.forEach((assignment) => {
            rows.push(<AssignmentRow assignment={assignment}></AssignmentRow>);
        });
        return (
            <TableContainer className="center">
                <Table size="small">
                    <colgroup>
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '30%' }} />
                        <col style={{ width: '10%' }} />
                        <col style={{ width: '10%' }} />
                    </colgroup>
                    <HeaderRow
                        columns={[
                            'Name',
                            'Course',
                            'Due',
                            'Weight',
                            'Done',
                            'Delete',
                        ]}
                    />
                    <TableBody>{rows}</TableBody>
                </Table>
            </TableContainer>
        );
    }
}
