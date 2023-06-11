import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material';

import { redirect } from 'react-router-dom';

import { APILogout } from '../api.js';

/**
 * Navbar
 * @param {boolean} loggedin
 */
export class Navbar extends React.Component {
    logout() {
        APILogout();
        window.location.replace('/login');
    }
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        }
    }
    
    render() {
        if(!this.props.loggedin) {
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

                        <Button color="inherit" href="/login">
                            <Typography variant="h6">Log In</Typography>
                        </Button>
                    </Toolbar>
                </AppBar>
            )
        }
        return (
            <>
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

                        <Button color="inherit" onClick={() => this.setState({dialogOpen: true})}>
                            <Typography variant="h6">Log Out</Typography>
                        </Button>
                    </Toolbar>
                </AppBar>

                <Dialog
                    open={this.state.dialogOpen}
                    onClose={() => this.setState({dialogOpen: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        Log out
                    </DialogTitle> */}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to log out?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => this.setState({dialogOpen: false})}
                            variant="text"
                            color="textOnColour"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => this.logout()}
                            variant="text"
                            color="textOnColour"
                        >
                            Log out
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

Navbar.defaultProps = {
    loggedin: true
}