import {
    Card,
    CardContent,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import React from 'react';

function getAssignmentsByCourse(a, course) {
    let assignments = [...a];
    return assignments.filter((a) => a.courseid === course.id);
}

function weightedAverage(items, weights) {
    let weightedTotal = 0;
    let weightSum = 0;
    for (let i = 0; i < weights.length; i++) {
        console.log('item is', items[i]);
        if (items[i] == null) {
            continue;
        }
        console.log(Number(weights[i]));
        weightSum += Number(weights[i]);
        weightedTotal += Number(weights[i]) * Number(items[i]);
    }
    weightSum = Math.min(weightSum, 100);
    console.log('it is', weightedTotal, weightSum, weightedTotal / weightSum);
    return weightedTotal / weightSum;
}

function getCourseAverage(course, assignments) {
    let assigs = getAssignmentsByCourse(assignments, course);
    let avg = weightedAverage(
        assigs.map((a) => a.grade),
        assigs.map((a) => a.weight)
    );
    return avg;
}

/**
 * A row containing one assignment
 *
 * @param {Object} assignment
 */
export class GradeRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.assignment;
    }

    updateGrade = (e) => {
        let grade = e.target.value !== '' ? e.target.value : null;
        this.setState({ grade: grade });
        this.props.updateAssignmentCallback({
            id: this.state.id,
            grade: grade,
        });
    };

    updateWeight = (e) => {
        let weight = e.target.value !== '' ? e.target.value : 0;
        this.setState({ weight: weight });
        this.props.updateAssignmentCallback({
            id: this.state.id,
            weight: weight,
        });
    };
    render() {
        const assignment = this.props.assignment;
        const { id, name, weight, grade } = assignment;
        return (
            <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>
                    <TextField
                        size="small"
                        label="Weight"
                        defaultValue={weight}
                        variant="standard"
                        onChange={this.updateWeight}
                    />
                </TableCell>
                <TableCell className="center">
                    <TextField
                        size="small"
                        label="Grade"
                        defaultValue={grade}
                        variant="standard"
                        onChange={this.updateGrade}
                    />
                </TableCell>
            </TableRow>
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
            <TableRow>
                <TableCell className="center">
                    {this.props.course.name}
                </TableCell>
                <TableCell />
                <TableCell className="center">
                    {this.props.course.credits} Credits
                </TableCell>
            </TableRow>
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
                <TableCell key={column} className="center-align">
                    <b>{column}</b>
                </TableCell>
            );
        });
        return <TableRow>{cells}</TableRow>;
    }
}

/**
 * Box containing all assignments for a course
 *
 * @param {Object} assignments
 * @param {Object} course
 */
export class CourseBox extends React.Component {
    render() {
        const rows = [];
        this.props.assignments.forEach((assignment) => {
            rows.push(
                <GradeRow
                    key={assignment.id}
                    assignment={assignment}
                    updateAssignmentCallback={
                        this.props.updateAssignmentCallback
                    }
                />
            );
        });
        return (
            <Card>
                <CardContent>
                    <Table id={this.props.course.id}>
                        <colgroup>
                            <col style={{ width: '50%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '20%' }} />
                        </colgroup>
                        <TableHead
                            style={{
                                backgroundColor: this.props.course.colour,
                            }}
                        >
                            <CourseHeader course={this.props.course} />
                            <HeaderRow
                                columns={['Assignment', 'Weight', 'Grade']}
                                colour={this.props.course.colour}
                            />
                        </TableHead>
                        <TableBody>{rows}</TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}

/**
 * The tally of total GPA
 * @param courses
 */
export class GPATally extends React.Component {
    render() {
        const twelvePointScale = {
            0: 0,
            50: 1,
            53: 2,
            57: 3,
            60: 4,
            63: 5,
            67: 6,
            70: 7,
            73: 8,
            77: 9,
            80: 10,
            85: 11,
            90: 12,
        };
        const fourPointScale = {
            0: 0,
            50: 0.7,
            53: 1,
            57: 1.3,
            60: 1.7,
            63: 2,
            67: 2.3,
            70: 2.7,
            73: 3,
            77: 3.3,
            80: 3.7,
            85: 3.9,
            90: 4,
        };

        function GPAScale(grade, scale) {
            let GPA = 0;
            for (let [percent, number] of Object.entries(scale)) {
                if (grade >= percent) {
                    GPA = number;
                }
            }
            return GPA;
        }
        let rows = [];
        let assignments = this.props.assignments;
        this.props.courses.forEach(function (course) {
            let avg = getCourseAverage(course, assignments)
            let fourpt = GPAScale(avg, fourPointScale);
            let twelvept = GPAScale(avg, twelvePointScale);
            rows.push(
                <TableRow key={Math.random()}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>{twelvept}</TableCell>
                    <TableCell>{fourpt}</TableCell>
                </TableRow>
            );
        });
        return (
            <Card>
                <CardContent>
                    <Table>
                    <colgroup>
                            <col style={{ width: '55%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '15%' }} />
                        </colgroup>
                        <TableHead>
                            <HeaderRow
                                columns={['Course', 'Credits', '12pt', '4pt']}
                                colour="#fff"
                            />
                        </TableHead>
                        <TableBody>{rows}</TableBody>
                    </Table>
                </CardContent>
            </Card>
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
                <Grid item key={course.id + 'coursebox'}>
                    <CourseBox
                        assignments={getAssignmentsByCourse(
                            this.props.assignments,
                            course
                        )}
                        course={course}
                        updateAssignmentCallback={
                            this.props.updateAssignmentCallback
                        }
                    />
                </Grid>
            );
        });
        return (
            <Grid container spacing={2}>
                {boxes}
            </Grid>
        );
    }
}
