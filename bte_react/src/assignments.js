import React from 'react';


export class AssignmentRow extends React.Component {
    render() {
        const assignment = this.props.assignment;
        const {colour, id, name, course, due, weight, done} = assignment;
        return (
            <tr key={id} style={{backgroundColor: colour}}>
                <td>{name}</td>
                <td>{course}</td>
                <td>{due}</td>
                <td>{weight}</td>
                <td>
                    <label>
                        <input type="checkbox" id={id}/>
                    </label>
                </td>
                <td><a className="black-text right"><i className="material-icons">delete</i></a></td>
            </tr>
        );
    }
}

export class HeaderRow extends React.Component {
    render() {
        const cells = []
        this.props.columns.forEach((column) => {
            cells.push(
                <td key={column} className="center-align"><b>{column}</b></td>
            )
        })
        return (
            <tr>
                {cells}
            </tr>
        );
    }
}

export class AssignmentTable extends React.Component {
    render() {
        const rows = [];
        this.props.assignments.forEach((assignment) => {
            rows.push(
                <AssignmentRow key={assignment.name} assignment={assignment}/>
            );
        })
        return (
            <table className="highlight col s12" id="assignmentTable">
                <thead>
                <HeaderRow columns={["Name", "Course", "Due", "Weight", "Done"]}/>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}
