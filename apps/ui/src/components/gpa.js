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

/**
 * A row containing one assignment
 *
 * @param {Object} assignment
 */
export class GradeRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {assignment: this.props.assignment};
    }
    updateGrade = (e) => {
        this.setState({assignment:{grade:e.target.value}});
    }
    render() {
        const assignment = this.props.assignment;
        const { id, name, weight, grade } = assignment;
        return (
            <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{weight}</TableCell>
                <TableCell className="center">
                    <TextField size="small" label="Grade" defaultValue={grade} variant="standard" onChange={this.updateGrade}/>
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
    constructor(props) {
        super(props);
        this.state = {average: 404};
    }
    updateAverage = (newAvg) => {
        this.setState({average: newAvg});
    }
    render() {
        return (
            <TableRow>
                <TableCell className="center">
                    {this.props.course.name}
                </TableCell>
                <TableCell className="center">
                    {this.props.course.credits} Credits
                </TableCell>
                <TableCell className="center">{this.state.average}</TableCell>
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
                <GradeRow key={assignment.name} assignment={assignment} />
            );
        });
        return (
            <Card>
                <CardContent>
                    <Table id={this.props.course.id}>
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
            0:0,
            50:1,
            53:2,
            57:3,
            60:4,
            63:5,
            67:6,
            70:7,
            73:8,
            77:9,
            80:10,
            85:11,
            90:12
        }
        const fourPointScale = {
            0:0,
            50:0.7,
            53:1,
            57:1.3,
            60:1.7,
            63:2,
            67:2.3,
            70:2.7,
            73:3,
            77:3.3,
            80:3.7,
            85:4,
            90:4.3
        }

        function weightedAverage(items, weights) {
            let weightSum = weights.reduce((partialSum, a) => partialSum + a, 0);
            let weightedTotal = 0
            for(let i = 0; i < weights.length; i++) {
                weightedTotal += weights[i] * items[i];
            }
            return weightedTotal / weightSum;
        }
        
        function GPAScale(grade, scale) {
            let GPA = 0;
            for (let [percent, number] of Object.entries(scale)) {
                if(grade >= percent) {
                    GPA = number;
                }
            };
            return GPA;
        }
        let rows = [];
        this.props.courses.forEach(function(course) {
            let avg = weightedAverage(course.assignments.map(a => a.grade), course.assignments.map(a => a.weight));
            let fourpt = GPAScale(avg, fourPointScale);
            let twelvept = GPAScale(avg, twelvePointScale);
            rows.push(<TableRow>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.credits}</TableCell>
                <TableCell>{twelvept}</TableCell>
                <TableCell>{fourpt}</TableCell>
            </TableRow>)
        });
        return (
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <HeaderRow columns={['Course', 'Credits', '12pt', '4pt']} colour="#fff"/>
                        </TableHead>
                        <TableBody>
                            {rows}
                        </TableBody>
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
                <Grid item>
                    <CourseBox
                        assignments={course.assignments}
                        course={course}
                    />
                    </Grid>
            );
        });
        return <Grid container spacing={2}>{boxes}</Grid>;
    }
}
