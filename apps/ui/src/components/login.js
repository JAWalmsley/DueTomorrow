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
            errors: { username: '', password: '' },
        };
    }
    async login() {
        this.setState({ errors: {} });
        let newErrors = { ...this.state.errors };
        newErrors.username = !this.state.username ? 'Username is required' : '';
        newErrors.password = !this.state.password ? 'Password is required' : '';
        if (!(newErrors.username || newErrors.password)) {
            try {
                let resp = await APIlogin(this.state);
                localStorage.setItem('userid', resp);
                window.location.replace('/');
            } catch (e) {
                if(e.message === 'Unauthorized') {
                    newErrors.password = 'Incorrect username or password';
                }
                console.log(e.message);
            }
        }
        this.setState({ errors: newErrors });
    }
    async register() {
        this.setState({ errors: {} });
        let newErrors = { ...this.state.errors };
        newErrors.username = !this.state.username ? 'Username is required' : '';
        newErrors.password = !this.state.password ? 'Password is required' : '';
        if (!(newErrors.username || newErrors.password)) {
            try {
                let resp = await APIregister(this.state);
                localStorage.setItem('userid', resp);
                window.location.replace('/');
            } catch (e) {
                console.log(await e);
                if(await e === 'Already exists') {
                    newErrors.username = 'That user already exists';
                }
            }
        }
        this.setState({ errors: newErrors });
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
                        DueTomorrow
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
                        error={this.state.errors.username !== ''}
                        helperText={this.state.errors.username}
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
                        error={this.state.errors.password !== ''}
                        helperText={this.state.errors.password}
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
