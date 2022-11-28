import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

export class Navbar extends React.Component {
    render() {
        const username = this.props.username;
        return (
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            BTE
                        </Typography>
                        <Button color="inherit" href="/">
                            Assignments
                        </Button>
                        <Button color="inherit" href="/gpa">
                            GPA
                        </Button>
                        <Button color="inherit">Log Out</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}
