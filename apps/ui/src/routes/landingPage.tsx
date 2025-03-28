import { CenterFocusStrong, Title } from '@mui/icons-material';
import { AppBar, Box, Button, Container, Grid, Paper, styled, Toolbar, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react'
import { AssignmentTable } from '../components/assignments/AssignmentTable';

export default function LandingPage() {
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
                        <Button color="inherit" href="/login" >
                            <Typography variant="h6">Log In</Typography>
                        </Button>
                        <Button color="inherit" href="/login" >
                            <Typography variant="h6">Register</Typography>
                        </Button>
                    </Toolbar>
                </AppBar>
            <Container >
                <Grid container paddingTop={10} alignItems="center" justifyContent={'center'}>
                    <Grid item xs={8}>
                    <Typography align='center' variant="h3">Better than a spreadsheet.</Typography>
                    </Grid>
                    <Grid item xs={8} lg={12}>
                        <Typography align='center' variant="h6" color="GrayText">Track all your assignments in one place and get a notification when there's something you forgot.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box height="64px" />
                    </Grid>
                    <Grid item xs={12}>
                        <Box component="img" src="assignmentspage.png" style={{maxWidth:'100%'}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box height="48px" />
                    </Grid>
                    <Grid item xs={8} lg={6} padding="8px">
                        <Typography align='center' variant="h6" >"DueTomorrow saves me from failing a class at least once a year"</Typography>
                        <Typography align='center' variant="body1" color="GrayText">Jack Walmsley, Founder & CEO @ DueTomorrow</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6} padding="8px">
                        <Typography align='center' variant="h6" >"I used to write down all my assignments on my arm but then I couldn't shower until I finished all of them. I much prefer the workflow of DueTomorrow."</Typography>
                        <Typography align='center' variant="body1" color="GrayText">Anonymous</Typography>
                    </Grid>
                </Grid>
                
            </Container>
        </>
    );
}
