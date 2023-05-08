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
        let dueString = dueDate.toLocaleString('en-GB', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
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
                            size="large"
                        />
                    </TableCell>
                    <TableCell>
                        <Button
                            onClick={() =>
                                this.props.deleteAssignmentCallback({
                                    id: this.state.id,
                                })
                            }
                        >
                            <Delete fontSize="large"/>
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
    initialState = {
        name: '',
        course: this.props.courses[0].name,
        courseInput: this.props.courses[0].id.toString(),
        courseid: this.props.courses[0].id,
        due: '',
        weight: '',
        id: '',
        errors: {name: '', course: '', due: '', weight: ''},
    };
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.nameInput = React.createRef();
    }

    submit() {
        this.setState({errors: {}});
        let newErrors = {...this.state.errors};
        newErrors.name = !this.state.name ? 'Name is required' : '';
        newErrors.course = !this.state.course ? "Course is required" : '';
        newErrors.due = !this.state.due ? "Due date is required" : '';
        newErrors.weight = !this.state.weight ? "Weight is required" : '';
        if(!(newErrors.name || newErrors.course || newErrors.due || newErrors.weight)) {
            let resp = this.props.newAssignmentCallback(this.state);
            this.setState(this.initialState);
            this.nameInput.current.focus();
        }
        this.setState({errors: newErrors});
        
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
                            <Grid item lg={3} xs={7}>
                                <TextField
                                    autoFocus
                                    color="secondary"
                                    fullWidth
                                    label="Name"
                                    variant="standard"
                                    value={this.state.name}
                                    inputRef={this.nameInput}
                                    onChange={(e) => {
                                        this.setState({ name: e.target.value });
                                    }}
                                    error={this.state.errors.name !== ''}
                                    helperText={this.state.errors.name}
                                />
                            </Grid>
                            {/* Course */}
                            <Grid item lg={4} xs={5}>
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
                                            error={this.state.errors.course !== ''}
                                            helperText={this.state.errors.course}
                                        />
                                    )}
                                />
                            </Grid>
                            {/* Date */}
                            <Grid item lg={3} xs={7}>
                                <TextField
                                    color="secondary"
                                    fullWidth
                                    label="Due Date"
                                    variant="standard"
                                    type="text"
                                    value={this.state.due}
                                    onChange={(e) => {
                                        this.setState({ due: e.target.value });
                                    }}
                                    error={this.state.errors.due !== ''}
                                    helperText={this.state.errors.due}
                                />
                            </Grid>
                            {/* Weight */}
                            <Grid item lg={2} xs={5}>
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
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') this.submit();
                                    }}
                                    error={this.state.errors.weight !== ''}
                                    helperText={this.state.errors.weight}
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
                                onClick={() => this.submit()}
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
        let sortedAssignments = [...this.props.assignments];
        sortedAssignments.sort((a, b) => {
            let aDate = Date.parse(a.due);
            let bDate = Date.parse(b.due);
            if (a.done === b.done) {
                return aDate - bDate;
            }
            return a.done ? 1 : -1;
        });

        let mdSize = window.matchMedia("(min-width: 900px)")

        return (
            <>
                <EntryRow
                    courses={this.props.courses}
                    newAssignmentCallback={this.props.createAssignmentCallback}
                />
                <TableContainer className="center">
                    <Table size={mdSize.matches ? "small" : "medium"}>
                        {console.log(mdSize.matches)}
                        <colgroup>
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '25%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '10%' }} />
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
                                            this.props.updateAssignmentCallback
                                        }
                                        deleteAssignmentCallback={
                                            this.props.deleteAssignmentCallback
                                        }
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
