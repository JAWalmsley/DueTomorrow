import React from 'react';

export class GradeRow extends React.Component {
    render() {
        const assignment = this.props.assignment;
        const { id, name, due, weight, done, grade } = assignment;
        let gradeCell = <td></td>;
        if (done) {
            gradeCell = (
                <td>
                    <input type="number" value={grade} />
                </td>
            );
        }
        return (
            <tr key={id}>
                <td>{name}</td>
                <td>{weight}</td>
                {gradeCell}
            </tr>
        );
    }
}

export class CourseBox extends React.Component {
    render() {
        const rows = [];
        this.props.assignments.forEach((assignment) => {
            rows.push(
                <GradeRow key={assignment.name} assignment={assignment} />
            );
        });
        return (
            <table className="highlight col s12" id="assignmentTable">
                <tbody>{rows}</tbody>
            </table>
        );
    }
}
