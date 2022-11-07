import React from 'react';

/**
 * A row containing one assignment
 *
 * @param {Object} assignment
 */
export class GradeRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        const assignment = this.props.assignment;
        const { id, name, due, weight, done, grade } = assignment;
        this.state.value = grade;
        let gradeCell = <td></td>;
        if (done) {
            gradeCell = (
                <td className="center">
                    <div className="input-field">
                        <input
                            className="grade"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                            style={{
                                height: '90%',
                                margin: '0px',
                                width: '100%',
                            }}
                        />
                    </div>
                </td>
            );
        }
        return (
            <tr key={id}>
                <td>{name}</td>
                <td className="center">{weight}</td>
                {gradeCell}
            </tr>
        );
    }
}

/**
 * Header of a course with title and credits
 *
 * @param {Object} course
 */
export class CourseHeader extends React.Component {
    render() {
        return (
            <tr>
                <td className="center">{this.props.course.name}</td>
                <td className="center">{this.props.course.credits} Credits</td>
                <td className="center">40%</td>
            </tr>
        );
    }
}

/**
 * Row with titles for the columns
 *
 * @param {String[]} columns
 */
export class HeaderRow extends React.Component {
    render() {
        const cells = [];
        this.props.columns.forEach((column) => {
            cells.push(
                <td key={column} className="center-align">
                    <b>{column}</b>
                </td>
            );
        });
        return <tr>{cells}</tr>;
    }
}

/**
 * Box containing all assignments for a course
 *
 * @param {Object} assignment
 * @param {Object} course
 */
export class CourseBox extends React.Component {
    render() {
        const rows = [];
        this.props.assignments.forEach((assignment) => {
            rows.push(
                <GradeRow key={assignment.name} assignment={assignment} />
            );
        });
        return (
            <table className="highlight col s6" id={this.props.course.id}>
                <thead style={{ backgroundColor: this.props.course.colour }}>
                    <CourseHeader course={this.props.course} />
                    <HeaderRow
                        columns={['Assignment', 'Weight', 'Grade']}
                        colour={this.props.course.colour}
                    />
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

/**
 * List of many courses
 *
 * @param {Object[]} courses
 */
export class CourseList extends React.Component {
    render() {
        const boxes = [];
        this.props.courses.forEach((course) => {
            boxes.push(
                <CourseBox assignments={course.assignments} course={course} />
            );
        });
        return <div>{boxes}</div>;
    }
}
