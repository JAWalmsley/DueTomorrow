import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Navbar } from '../components/navbar.js';
import { EntryRow, CourseList } from '../components/courses.js';
export default function CoursePage() {
    let c = [
        {
            id: '12342235410',
            userid: '52555045-acbd-43e6-ab83-3e0e074f74e2',
            name: 'SFWRENG 2DA4',
            colour: '#999900',
            credits: 4,
        },
        {
            id: '12345410',
            userid: '52555045-acbd-43e6-ab83-3e0e074f74e2',
            name: 'coursename3',
            colour: '#e7e',
            credits: 3,
        },
        {
            id: '12345678965410',
            userid: '52555045-acbd-43e6-ab83-3e0e074f74e2',
            name: 'coursename2',
            colour: '#7ee',
            credits: 3,
        },
    ];
    return (
        <>
            <Navbar />
            <Container>
                <Grid container spacing={2} padding={1}>
                    <Grid item xs={12}>
                        <EntryRow />
                    </Grid>
                    <Grid item xs={12}>
                        <CourseList courses={c} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
