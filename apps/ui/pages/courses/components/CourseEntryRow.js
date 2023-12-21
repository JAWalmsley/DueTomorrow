import {
    Card,
    CardActions,
    CardContent,
    Grid,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import DTColourPicker from '../../../src/components/DTColourPicker';
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

/**
 * @param {Function} newCourseCallback
 */
export class CourseEntryRow extends React.Component {
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
