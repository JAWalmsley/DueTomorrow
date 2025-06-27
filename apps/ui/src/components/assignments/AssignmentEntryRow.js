import React from 'react';
import Button from '@mui/material/Button';
import {
    Autocomplete,
    Card,
    CardActions,
    CardContent,
    Grid, TextField,
    Typography
} from '@mui/material';

/**
 * Row for entering a new assignment
 * @param courses
 * @param newAssignmentCallback
 */

export class AssignmentEntryRow extends React.Component {
    constructor(props) {
        super(props);
        this.editableCourses = props.courses.filter((c) => c.editor === 1);
        this.state = {
            name: '',
            course: this.editableCourses.length > 0 ? this.editableCourses[0].name : '',
            courseInput: this.editableCourses.length > 0 ? this.editableCourses[0].id.toString() : '',
            courseid: this.editableCourses.length > 0 ? this.editableCourses[0].id : '',
            due: '',
            weight: '',
            id: '',
            errors: { name: '', course: '', due: '', weight: '' },
        }
        this.initialState = { ...this.state };
        this.nameInput = React.createRef();
    }

    submit() {
        this.setState({ errors: {} });
        let newErrors = { ...this.state.errors };
        newErrors.name = !this.state.name ? 'Name is required' : '';
        newErrors.course = !this.state.course ? 'Course is required' : '';
        newErrors.due = !this.state.due ? 'Due date is required' : '';
        newErrors.weight = !this.state.weight ? 'Weight is required' : '';
        if (!(
            newErrors.name ||
            newErrors.course ||
            newErrors.due ||
            newErrors.weight
        )) {
            let resp = this.props.newAssignmentCallback(this.state);
            this.setState(this.initialState);
            this.nameInput.current.focus();
        }
        this.setState({ errors: newErrors });
    }

    render() {
        return (
            <>
                <Card>
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
                                    helperText={this.state.errors.name} />
                            </Grid>
                            {/* Course */}
                            <Grid item lg={4} xs={5}>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={this.props.courses.filter((c) => c.editor === 1).map(
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
                                            helperText={this.state.errors.course} />
                                    )} />
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
                                    helperText={this.state.errors.due} />
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
                                    helperText={this.state.errors.weight} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Button
                                size="large"
                                variant="contained"
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
