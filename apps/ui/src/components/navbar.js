import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { APILogout } from '../api.js';

export class Navbar extends React.Component {
    logout() {
        APILogout();
        window.location.replace('/login');
    }
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h3"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        DT
                    </Typography>
                    <Button color="inherit" href="/">
                        <Typography variant="h6">Assignments</Typography>
                    </Button>
                    <Button color="inherit" href="/courses">
                        <Typography variant="h6">Courses</Typography>
                    </Button>
                    <Button color="inherit" href="/gpa">
                        <Typography variant="h6">GPA</Typography>
                    </Button>

                    <Button color="inherit" onClick={this.logout}>
                        <Typography variant="h6">Log Out</Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}
