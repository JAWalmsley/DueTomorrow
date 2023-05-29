import {
    Card,
    CardActions,
    CardContent,
    Grid,
    TextField,
    Typography,
    Button,
} from '@mui/material';

import { Delete } from '@mui/icons-material';

import { TwitterPicker } from 'react-color';

import DTColourPicker from './DTColourPicker';

import {
    red,
    orange,
    blueGrey,
    green,
    blue,
    indigo,
    purple,
} from '@mui/material/colors';

import React from 'react';
import colourPicker from './DTColourPicker';
/**
 * @param {Function} newCourseCallback
 */
export class EntryRow extends React.Component {
    initialState = {
        name: '',
        credits: '',
        colour: '#FFFFFF',
        errors: { name: '', credits: '' },
    };
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    submit() {
        this.setState({ errors: {} });
        let newErrors = { ...this.state.errors };
        newErrors.name = !this.state.name ? 'Name is required' : '';
        newErrors.credits = !this.state.credits ? 'Credits is required' : '';
        if (!(newErrors.name || newErrors.credits)) {
            let resp = this.props.newCourseCallback(this.state);
            this.setState(this.initialState);
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
                            New Course
                        </Typography>

                        <Grid container spacing={2}>
                            {/* Name */}
                            <Grid item lg={5} xs={12}>
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
                                    error={this.state.errors.name !== ''}
                                    helperText={this.state.errors.name}
                                />
                            </Grid>
                            {/* Credits */}
                            <Grid item lg={2} xs={8}>
                                <TextField
                                    color="secondary"
                                    fullWidth
                                    label="Credits"
                                    variant="standard"
                                    type="number"
                                    value={this.state.credits}
                                    onChange={(e) => {
                                        this.setState({
                                            credits: e.target.value,
                                        });
                                    }}
                                    error={this.state.errors.credits !== ''}
                                    helperText={this.state.errors.credits}
                                />
                            </Grid>
                            {/* Colour */}
                            <Grid container item lg={5} xs={4}>
                                {/* <TwitterPicker
                                    color={this.state.colour}
                                    colors={[
                                        red[800],
                                        orange[900],
                                        green[800],
                                        blue[800],
                                        blueGrey[700],
                                        indigo[500],
                                        purple[500],
                                    ]}
                                    sx={{ backgroundColor: "red" }}
                                    onChangeComplete={(e) =>
                                        this.setState({ colour: e.hex })
                                    }
                                ></TwitterPicker> */}
                                <DTColourPicker
                                    colour={this.state.colour}
                                    colours={[
                                        red[800],
                                        orange[900],
                                        green[800],
                                        blue[800],
                                        blueGrey[700],
                                        indigo[800],
                                        purple[500],
                                    ]}
                                    sx={{ backgroundColor: 'red' }}
                                    onChange={(colour) => {
                                        this.setState({ colour: colour.hex });
                                    }}
                                ></DTColourPicker>
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

/**
 * @param {Object} course
 *
 */
export class CourseBox extends React.Component {
    render() {
        return (
            <>
                <Card elevation={1}>
                    <CardContent
                        style={{ backgroundColor: this.props.course.colour }}
                    >
                        <Typography
                            variant="h4"
                            component="div"
                            color="textOnColour.main"
                        >
                            {this.props.course.name}
                        </Typography>
                        <Typography color="textOnColour.main">
                            {this.props.course.credits} credits
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                onClick={() =>
                                    this.props.deleteCourseCallback({
                                        id: this.props.course.id,
                                    })
                                }
                            >
                                <Typography variant="button">Delete</Typography>
                            </Button>
                        </Grid>
                    </CardActions>
                </Card>
            </>
        );
    }
}

/**
 * @param {Array} courses
 */
export class CourseList extends React.Component {
    render() {
        return (
            <>
                <Grid container spacing={2} padding={1}>
                    {this.props.courses.map((course) => {
                        return (
                            <Grid item xs={12} lg={4} key={course.id}>
                                <CourseBox
                                    course={course}
                                    deleteCourseCallback={
                                        this.props.deleteCourseCallback
                                    }
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </>
        );
    }
}
