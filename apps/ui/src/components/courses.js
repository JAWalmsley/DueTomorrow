import {
    Card,
    CardActions,
    CardContent,
    Grid,
    TextField,
    Typography,
    Button,
} from '@mui/material';

import { TwitterPicker } from 'react-color';

import React from 'react';

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
                                        this.setState({ colour: e })
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
