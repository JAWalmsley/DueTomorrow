import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { APIlogin, APIregister } from '../api.js';

export class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    login() {
        APIlogin(this.state)
            .then((res) => {
                if (res.status === 200) {
                    return res.text();
                }
                console.log('bad');
            })
            .then((uid) => localStorage.setItem('userid', uid));
    }
    register() {
        APIregister(this.state)
            .then((res) => {
                if (res.status === 200) {
                    return res.text();
                }
                console.log('bad');
            })
            .then((uid) => localStorage.setItem('userid', uid));
    }
    render() {
        return (
            <Grid container justifyContent="center" rowSpacing={2}>
                <Grid item xs={12}>
                    <Typography
                        variant="h2"
                        component="div"
                        color="primary"
                        align="center"
                        sx={{ fontWeight: 400 }}
                    >
                        BTE
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        value={this.state.username}
                        onChange={(e) => {
                            this.setState({ username: e.target.value });
                        }}
                    ></TextField>
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        value={this.state.password}
                        onChange={(e) => {
                            this.setState({ password: e.target.value });
                        }}
                    ></TextField>
                </Grid>
                {/*force new row */}
                <Box width="100%"></Box>
                <Grid container item justifyContent="center">
                    <Grid container item justifyContent="left" xs={3}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={this.register.bind(this)}
                        >
                            New Account
                        </Button>
                    </Grid>
                    <Grid container item justifyContent="right" xs={2}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={this.login.bind(this)}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
