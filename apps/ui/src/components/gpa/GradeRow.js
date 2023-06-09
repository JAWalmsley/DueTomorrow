import {
    TableCell, TableRow,
    TextField
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
                        onChange={this.updateWeight} />
                </TableCell>
                <TableCell className="center">
                    <TextField
                        size="small"
                        label="Grade"
                        defaultValue={grade}
                        variant="standard"
                        onChange={this.updateGrade} />
                </TableCell>
            </TableRow>
        );
    }
}
