import {
    Card,
    CardContent, Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import React from 'react';
import { HeaderRow } from '../HeaderRow';
import { getAssignmentsByCourse } from './CourseList';

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
    // console.log('it is', weightedTotal, weightSum, weightedTotal / weightSum);
    return weightedTotal / weightSum;
}

export function getCourseAverage(course, assignments) {
    let assigs = getAssignmentsByCourse(assignments, course);
    let avg = weightedAverage(
        assigs.map((a) => a.grade),
        assigs.map((a) => a.weight)
    );
    return avg;
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
            let avg = getCourseAverage(course, assignments);
            let fourpt = GPAScale(avg, fourPointScale);
            let twelvept = GPAScale(avg, twelvePointScale);
            rows.push(
                <TableRow key={Math.random()}>
                    <TableCell align="left">{course.name}</TableCell>
                    <TableCell align="center">{course.credits}</TableCell>
                    <TableCell align="center">{twelvept}</TableCell>
                    <TableCell align="center">{fourpt}</TableCell>
                </TableRow>
            );
        });
        return (
            <Card>
                <CardContent>
                    <Table>
                        <colgroup>
                            <col style={{ width: '50%' }} />
                            <col style={{ width: '20%' }} />
                            <col style={{ width: '15%' }} />
                            <col style={{ width: '15%' }} />
                        </colgroup>
                        <TableHead>
                            <HeaderRow
                                columns={['Course', 'Credits', '12pt', '4pt']}
                                colour="#fff" />
                        </TableHead>
                        <TableBody>{rows}</TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}
