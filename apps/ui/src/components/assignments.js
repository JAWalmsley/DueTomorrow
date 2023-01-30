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

/**
 * Row of one assignment
 * @param {Object} assignment
 */
export class AssignmentRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.assignment,
        };
    }
    handleChange(e) {
        console.log(e.target.checked);
        this.setState({ done: e.target.checked });
        this.props.updateAssignmentCallback({...this.state, done: e.target.checked});
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
                <TableRow key={this.state.id} sx={{ backgroundColor: this.state.colour }}>
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
                        <Button>
                            <Delete  />
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
                                        console.log("setting id", id);
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
                                        console.log(this.state);
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
    render() {
        let rows = [];
        if (this.props.assignments !== undefined) {
            this.props.assignments.forEach((assignment) => {
                rows.push(
                    <AssignmentRow
                        key={rows.length}
                        assignment={assignment}
                        updateAssignmentCallback={this.props.updateAssignmentCallback}
                    ></AssignmentRow>
                );
            });
        }

        return (
            <>
                <EntryRow
                    courses={this.props.courses}
                    newAssignmentCallback={this.props.newAssignmentCallback}
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
                        <TableBody>{rows}</TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}
