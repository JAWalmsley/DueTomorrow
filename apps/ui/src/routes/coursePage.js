import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Navbar } from '../components/navbar.js';
import { EntryRow } from '../components/courses.js';
export default function CoursePage() {
    return (
        <>
            <Navbar />
            <Container>
                <Grid container spacing={2} padding={1}>
                    <Grid item xs={12}>
                        <EntryRow />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
