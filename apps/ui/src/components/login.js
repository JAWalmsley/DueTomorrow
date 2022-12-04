import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export class LoginBox extends React.Component {
    render() {
        return (
            <Grid
                container
                justifyContent="center"
                rowSpacing={2}
            >
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
                    ></TextField>
                </Grid>
                <Grid item xs={7}>
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                    ></TextField>
                </Grid>
                {/*force new row */}
                <Box width="100%"></Box>
                <Grid container item justifyContent="center">
                    <Grid container item justifyContent="left" xs={3}>
                        <Button variant="contained" size="large">New Account</Button>
                    </Grid>
                    <Grid container item justifyContent="right" xs={2}>
                        <Button variant="contained" size="large">Login</Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
