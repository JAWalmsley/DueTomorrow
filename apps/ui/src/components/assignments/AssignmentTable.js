import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import {
    Paper,
} from '@mui/material';

import { HeaderRow } from '../HeaderRow';
import { AssignmentRow } from './AssignmentRow';
import { AssignmentEntryRow } from './AssignmentEntryRow';

export class AssignmentTable extends React.Component {
    render() {
        let sortedAssignments = [...this.props.assignments];
        sortedAssignments.sort((a, b) => {
            let aDate = Date.parse(a.due);
            let bDate = Date.parse(b.due);
            if (a.done === b.done) {
                return aDate - bDate;
            }
            return a.done ? 1 : -1;
        });

        let mdSize = window.matchMedia('(min-width: 900px)');

        return (
            <>
                <Paper elevation={1} sx={{marginBottom: '8px'}}>
                    <AssignmentEntryRow
                        courses={this.props.courses}
                        newAssignmentCallback={
                            this.props.createAssignmentCallback
                        }
                    />
                </Paper>
                <Paper elevation={1}>
                    <TableContainer className="center">
                        <Table size={mdSize.matches ? 'small' : 'medium'}>
                            {console.log(mdSize.matches)}
                            <colgroup>
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '10%' }} />
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '15%' }} />
                            </colgroup>
                            <HeaderRow
                                columns={[
                                    'Name',
                                    'Course',
                                    'Due',
                                    'Weight',
                                    'Done',
                                    '',
                                ]}
                            />
                            <TableBody key={Math.random()}>
                                {sortedAssignments.map((assignment, i) => {
                                    return (
                                        <AssignmentRow
                                            key={'ar' + assignment.id}
                                            assignment={assignment}
                                            updateAssignmentCallback={
                                                this.props
                                                    .updateAssignmentCallback
                                            }
                                            deleteAssignmentCallback={
                                                this.props
                                                    .deleteAssignmentCallback
                                            }
                                            course={this.props.courses.find(
                                                (c) =>
                                                    c.id === assignment.courseid
                                            )}
                                        ></AssignmentRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </>
        );
    }
}
