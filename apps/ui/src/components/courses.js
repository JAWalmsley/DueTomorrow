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

import React from 'react';
/**
 * @param {Function} newCourseCallback
 */
export class EntryRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            credits: '',
            colour: '',
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
                            New Course
                        </Typography>

                        <Grid container spacing={2}>
                            {/* Name */}
                            <Grid item sm={5}>
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
                            {/* Credits */}
                            <Grid item sm={2}>
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
                                />
                            </Grid>
                            {/* Colour */}
                            <Grid item sm={5}>
                                <TwitterPicker
                                    color={this.state.colour}
                                    colors={[
                                        '#EB144C',
                                        '#FF6900',
                                        '#FCB900',
                                        '#7BDCB5',
                                        '#8ED1FC',
                                        '#0693E3',
                                        '#9900EF',
                                    ]}
                                    onChangeComplete={(e) =>
                                        this.setState({ colour: e.hex })
                                    }
                                ></TwitterPicker>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Button
                                size="large"
                                variant="outlined"
                                color="secondary"
                                onClick={() => this.props.newCourseCallback(this.state)}
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
                <Card>
                    <CardContent  style={{ backgroundColor: this.props.course.colour }}> 
                        <Typography variant="h5" component="div">
                            {this.props.course.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {this.props.course.credits} credits
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Button size="large" color="primary" variant='text' onClick={() => this.props.deleteCourseCallback({id: this.props.course.id})}>
                                <Delete />
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
                                <CourseBox course={course} deleteCourseCallback={this.props.deleteCourseCallback}/>
                            </Grid>
                        );
                    })}
                </Grid>
            </>
        );
    }
}
