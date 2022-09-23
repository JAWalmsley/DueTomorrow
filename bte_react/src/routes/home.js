import {AssignmentTable} from '../components/assignments.js'
import {Navbar} from '../components/navbar.js'

import '../css/materialize.css';
import '../css/styles.css';

const ASSIGNMENTS = [
    {
        colour: "#ff00ff",
        course: 'ENGINEER 1P13B',
        id: '5675675675678',
        name: 'assignmentname',
        due: '2003-09-30T04:00:00.000Z',
        done: 0,
        weight: 50,
        grade: 0
    }
]
const USERNAME = "Jack";

export default function Home() {
    return (
        <>
            <Navbar username={USERNAME}/>
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <AssignmentTable assignments={ASSIGNMENTS}/>
                    </div>
                </div>
            </div>
        </>
    );
}
