import { AssignmentTable } from '../components/assignments.js';
import { Navbar } from '../components/navbar.js';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import '../css/styles.css';
import { APIassignmentsGet } from '../api.js';

const ASSIGNMENTS = [
    {
        colour: '#ffaaff',
        course: 'ENGINEER 1P13B',
        id: '5675675675678',
        name: 'assignmentname',
        due: '2003-09-30T04:00:00.000Z',
        done: 0,
        weight: 50,
        grade: 0,
    },
    {
        colour: '#ffaaff',
        course: 'ENGINEER 1P13B',
        id: '5675675621111',
        name: 'assignmentname2',
        due: '2003-10-30T04:00:00.000Z',
        done: 1,
        weight: 75,
        grade: 0,
    },
];
const USERNAME = 'Jack';
const COURSES = [
    {
        name: 'Balls',
        colour: '#ffff00',
        assignments: ASSIGNMENTS,
        id: 55389202839382,
        credits: 3,
    },
    {
        name: 'Balls Course 2',
        colour: '#0000ff',
        assignments: ASSIGNMENTS,
        id: 92821201821,
        credits: 6,
    },
];

export default function Home() {
    let userid = localStorage.getItem('userid');
    let assignments;
    if (!userid) {
        window.location.replace('/login');
    }
    APIassignmentsGet(userid)
        .then((e) => e.json())
        .then((data) => assignments = data);
    return (
        <>
            <Navbar username={USERNAME} />
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <AssignmentTable
                            assignments={assignments}
                            courses={COURSES}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
