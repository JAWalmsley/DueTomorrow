import { CourseList } from '../components/gpa.js';
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
        grade: 60,
    },
];
const COURSES = [
    {
        "name": "Balls",
        "colour": '#ffff00',
        "assignments": ASSIGNMENTS,
        "id": 55389202839382,
        "credits": 3
    },
    {
        "name": "Balls Course 2",
        "colour": "#0000ff",
        "assignments": ASSIGNMENTS,
        "id": 92821201821,
        "credits": 6
    }
]
const USERNAME = 'Jack';

export default function GPAPage() {
    return (
        <>
            <Navbar username={USERNAME} />
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <CourseList courses={COURSES} />
                    </div>
                </div>
            </div>
        </>
    );
}
