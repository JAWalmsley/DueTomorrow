import { AssignmentTable } from '../components/assignments.js';
import { Navbar } from '../components/navbar.js';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import '../css/styles.css';



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



export default function Home() {
    return (
        <>
        <Navbar username={USERNAME} />
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <AssignmentTable assignments={ASSIGNMENTS} />
                    </Grid>
                </Grid>
            </Container>
        </>
           
    );
}
