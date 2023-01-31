import { Container, Grid } from '@mui/material';
import { CourseList, GPATally } from '../components/gpa.js';
import { Navbar } from '../components/navbar.js';

import '../css/styles.css';

const ASSIGNMENTS = [
    {
        course: 'ENGINEER 1P13B',
        id: '5675675675678',
        name: 'assignmentname',
        due: '2003-09-30T04:00:00.000Z',
        done: 1,
        weight: 50,
        grade: 100,
    },
    {
        course: 'ENGINEER 1P13B',
        id: '56756754vdf78',
        name: 'assignmentname2',
        due: '2003-09-30T04:00:00.000Z',
        done: 1,
        weight: 50,
        grade: 100,
    },
];
const COURSES = [
    {
        name: 'Balls',
        colour: '#ffffaa',
        assignments: ASSIGNMENTS,
        id: 55389202839382,
        credits: 3,
    },
    {
        name: 'Balls Course 2',
        colour: '#aaaaff',
        assignments: ASSIGNMENTS,
        id: 92821201821,
        credits: 6,
    },
    {
        name: 'Balls Course 3',
        colour: '#ffaaff',
        assignments: ASSIGNMENTS,
        id: 92821201821,
        credits: 6,
    },
];

export default function GPAPage() {
    return (
        <>
            <Navbar />
            <Container>
                <Grid container spacing={2} padding={1}>
                    <Grid item xs={7}>
                        <CourseList courses={COURSES} />
                    </Grid>
                    <Grid item xs={5} spacing={2}>
                        <GPATally courses={COURSES}/>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}