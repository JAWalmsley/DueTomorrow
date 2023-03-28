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
import {
    Autocomplete,
    Card,
    CardActions,
    CardContent,
    Grid,
    TextField,
    Typography,
} from '@mui/material';

import { APIAssignmentPost, APIAssignmentModify, APIAssignmentsGet, APIAssignmentDelete } from '../api.js';

/**
 * Row of one assignment
 * @param {Object} assignment
 * @param {Object} course
 */
export class AssignmentRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.assignment,
            colour: this.props.course.colour,
            course: this.props.course.name,
        };
    }
    handleChange(e) {
        this.setState({ done: e.target.checked });
        this.props.updateAssignmentCallback({
            id: this.state.id,
            done: e.target.checked,
        });
    }

    // eslint-disable-next-line
    handleChange = this.handleChange.bind(this);
    render() {
        let dueDate = new Date(this.state.due);
        let dueString = dueDate.toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return (
            <>
                <TableRow
                    key={Math.random()}
                    sx={{ backgroundColor: this.state.colour }}
                >
                    <TableCell>{this.state.name}</TableCell>
                    <TableCell>{this.state.course}</TableCell>
                    <TableCell>{dueString}</TableCell>
                    <TableCell>{this.state.weight}</TableCell>
                    <TableCell>
                        <Checkbox
                            key={Math.random()}
                            defaultChecked={!!this.state.done}
                            onChange={this.handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </TableCell>
                    <TableCell>
                        <Button onClick={() => this.props.deleteAssignmentCallback({id: this.state.id})}>
                            <Delete />
                        </Button>
                    </TableCell>
                </TableRow>
            </>
        );
    }
}

/**
 * Row for entering a new assignment
 * @param courses
 * @param newAssignmentCallback
 */
export class EntryRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            course: this.props.courses[0].name,
            courseInput: this.props.courses[0].id.toString(),
            courseid: this.props.courses[0].id,
            due: '',
            weight: '',
            id: '',
        };
    }

    render() {
        return (
            <>
                <Card variant="outlined">
                    <CardContent>
                        <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                        >
                            New Assignment
                        </Typography>

                        <Grid container spacing={2}>
                            {/* Name */}
                            <Grid item sm={3}>
                                <TextField
                                    autoFocus
                                    color="secondary"
                                    fullWidth
                                    label="Name"
                                    variant="standard"
                                    value={this.state.name}
                                    onChange={(e) => {
                                        this.setState({ name: e.target.value });
                                    }}
                                />
                            </Grid>
                            {/* Course */}
                            <Grid item sm={4}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={this.props.courses.map(
                                        (a) => a.name
                                    )}
                                    value={this.state.course}
                                    onChange={(_, newValue) => {
                                        this.setState({
                                            course: newValue,
                                        });

                                        let id = this.props.courses.find(
                                            (c) => c.name === newValue
                                        ).id;
                                        this.setState({
                                            courseid: id,
                                        });
                                    }}
                                    inputValue={this.state.courseInput}
                                    onInputChange={(_, newValue) => {
                                        this.setState({
                                            courseInput: newValue,
                                        });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            color="secondary"
                                            fullWidth
                                            label="Course"
                                            variant="standard"
                                        />
                                    )}
                                />
                            </Grid>
                            {/* Date */}
                            <Grid item sm={3}>
                                <TextField
                                    color="secondary"
                                    fullWidth
                                    label=" "
                                    variant="standard"
                                    type="date"
                                    value={this.state.due}
                                    onChange={(e) => {
                                        this.setState({ due: e.target.value });
                                    }}
                                />
                            </Grid>
                            {/* Weight */}
                            <Grid item sm={2}>
                                <TextField
                                    color="secondary"
                                    fullWidth
                                    label="Weight"
                                    variant="standard"
                                    type="number"
                                    value={this.state.weight}
                                    onChange={(e) => {
                                        this.setState({
                                            weight: e.target.value,
                                        });
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Button
                                size="large"
                                variant="outlined"
                                color="secondary"
                                onClick={() =>
                                    this.props.newAssignmentCallback(this.state)
                                }
                            >
                                Add
                            </Button>
                        </Grid>
                    </CardActions>
                </Card>
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
    constructor(props) {
        super(props);
        this.state = {
            assignments: this.props.assignments,
        };
    }

    createAssignment(assig) {
        APIAssignmentPost({ ...assig, userid: this.props.userid }).then(
            (newid) => {
                assig.id = newid;
                assig.userid = this.props.userid;
                assig.done = false;
                this.setState({
                    assignments: [...this.state.assignments, assig],
                });
            }
        );
    }
    // eslint-disable-next-line
    createAssignment = this.createAssignment.bind(this);

    updateAssignment(data) {
        APIAssignmentModify({ ...data, userid: this.props.userid }).then(() => {
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

    render() {
        let sortedAssignments = [...this.state.assignments];
        sortedAssignments.sort((a, b) => {
            let aDate = Date.parse(a.due);
            let bDate = Date.parse(b.due);
            if (a.done === b.done) {
                return aDate - bDate;
            }
            return a.done ? 1 : -1;
        });

        return (
            <>
                <EntryRow
                    courses={this.props.courses}
                    newAssignmentCallback={this.createAssignment}
                />
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
                        <TableBody key={Math.random()}>
                            {sortedAssignments.map((assignment, i) => {
                                return (
                                    <AssignmentRow
                                        key={Math.random()}
                                        assignment={assignment}
                                        updateAssignmentCallback={
                                            this.updateAssignment
                                        }
                                        deleteAssignmentCallback={this.props.deleteAssignmentCallback}
                                        course={this.props.courses.find(
                                            (c) => c.id === assignment.courseid
                                        )}
                                    ></AssignmentRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}
