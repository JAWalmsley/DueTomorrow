import { CenterFocusStrong, Title } from '@mui/icons-material';
import { AppBar, Box, Button, Container, Grid, Paper, styled, Toolbar, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import React from 'react'
import { AssignmentTable } from '../components/assignments/AssignmentTable';

export default function LandingPage() {
    return (
        <>
                <AppBar position="static">
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <Box component="img" src='favicon.png' height='32px' />
                        <Box textAlign={'right'}>
                        <Button color="inherit" href="/login" >
                            <Typography variant="h6">Log In</Typography>
                        </Button>
                        <Button color="inherit" href="/login" >
                            <Typography variant="h6">Register</Typography>
                        </Button>
                        </Box>
                        
                    </Toolbar>
                </AppBar>
            <Container >
                <Grid container paddingTop={10} alignItems="center" justifyContent={'center'}>
                    <Grid item xs={12} paddingBottom='32px'>
                    <Typography align='center' variant="h1" color='primary.main'>DueTomorrow</Typography>
                    </Grid>
                    <Grid item xs={8}>
                    <Typography align='center' variant="h3">Better than a spreadsheet.</Typography>
                    </Grid>
                    <Grid item xs={8} lg={12}>
                        <Typography align='center' variant="h6" color="GrayText">Track all your assignments in one place and get a notification when there's something you forgot</Typography>
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

                    <Grid item xs={12} lg={6} padding="8px">
                        <Typography align='center' variant="h6" >"DueTomorrow saves me from failing a class at least once a year"</Typography>
                        <Typography align='center' variant="body1" color="GrayText">Jack Walmsley, Founder & CEO @ DueTomorrow</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6} padding="8px">
                        <Typography align='center' variant="h6" >"I used to write down all my assignments on my arm but then I couldn't shower until I finished all of them. I much prefer the workflow of DueTomorrow."</Typography>
                        <Typography align='center' variant="body1" color="GrayText">Anonymous</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box height="48px" />
                    </Grid>

                    <Grid item xs={12} lg={4} marginBottom="16px" alignSelf={'start'}>
                    <Typography align='left' variant="h4">Share courses with your friends</Typography>
                    <Typography align='left' variant="body1" color="GrayText">When you add an assignment, it'll show up for everyone else too</Typography>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Box component="img" src="sharepage.png" style={{maxWidth:'100%'}}></Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Box height="64px" />
                    </Grid>

                    <Grid item xs={12} lg={4} marginBottom="16px" alignSelf={'start'}>
                    <Typography align='left' variant="h4">Calculate your GPA</Typography>
                    <Typography align='left' variant="body1" color="GrayText">At least it won't be a surprise.</Typography>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Box component="img" src="gpapage.png" style={{maxWidth:'100%'}}></Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Box height="48px" />
                    </Grid>

                    

                    <Grid item xs={12} lg={8} paddingBottom="32px">
                    <Typography sx={{textAlign:{lg: 'left', xs: 'center'}}} variant="h4">Never forget an assignment again</Typography>
                    <Typography sx={{textAlign:{lg: 'left', xs: 'center'}}} variant="body1" color="GrayText">Be fully aware you're not doing it</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign={'center'}>
                        <Button href="/login" variant='contained' size='large'>Create Account</Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Box height="48px" />
                    </Grid>

                    <Grid item xs={12} marginBottom="16px">
                    <Typography align='center' variant="body1" color="GrayText">&copy; {new Date().getFullYear()} Jack Walmsley</Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
