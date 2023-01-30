import { AssignmentTable } from '../components/assignments.js';
import { Navbar } from '../components/navbar.js';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import '../css/styles.css';
import { APIassignmentsGet, APIassignmentPost } from '../api.js';
import React from 'react';

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

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            loaded: false,
        };
    }

    createAssignment(assig) {
        let userid = localStorage.getItem('userid');
        console.log("Creating assignment for user " + userid);
        console.log(assig);
        APIassignmentPost({...assig, userid: userid}).then((newid) => {
            this.setState({assignments: [...this.state.assignments,assig]});
        });
    }

    getAssignments(){
        let userid = localStorage.getItem('userid');
        APIassignmentsGet(userid)
            .then((e) => {
                if(e.status === 200){
                    return e.json()
                }
                window.location.replace('/login');
                throw new Error("Not logged in");
            } )
            .then((data) => {
                this.setState({ assignments: data, loaded: true });
                console.log("recieved", data)
            });
    }

    componentDidMount() {
        this.getAssignments();
    }

    render() {
        // if (this.userid == null) {
        //     window.location.replace('/login');
        // }
        if(!this.state.loaded){
            return(<>Loading...</>)
        }
        return (
            <>
                <Navbar username={USERNAME} />
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <AssignmentTable
                                assignments={this.state.assignments}
                                newAssignmentCallback={this.createAssignment}
                                courses={COURSES}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </>
        );
    }
}
