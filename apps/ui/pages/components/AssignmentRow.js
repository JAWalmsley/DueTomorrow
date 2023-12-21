import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

/**
 * Row of one assignment
 * @param {Object} assignment
 * @param {Object} course
 */

export class AssignmentRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.assignment,
            colour: this.props.course.colour,
            course: this.props.course.name,
        };
    }
    handleChange(e) {
        this.setState({ done: e.target.checked });
        this.props.updateAssignmentCallback({
            id: this.state.id,
            done: e.target.checked,
        });
    }

    // eslint-disable-next-line
    handleChange = this.handleChange.bind(this);
    render() {
        let dueDate = new Date(this.state.due);
        let dueString = dueDate.toLocaleString('en-GB', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            timeZone: 'UTC',
        });

        return (
            <>
                <TableRow
                    key={Math.random()}
                    sx={{
                        backgroundColor: this.state.done ? "#555" : this.state.colour,
                        textAlign: 'left',
                    }}
                >
                    <TableCell sx={{ color: 'textOnColour.main' }}>
                        <Typography>{this.state.name}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'textOnColour.main' }}>
                        <Typography>{this.state.course}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'textOnColour.main' }}>
                        <Typography>{dueString}</Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'textOnColour.main' }}>
                        <Typography>{this.state.weight}</Typography>
                    </TableCell>
                    <TableCell
                        sx={{
                            color: 'textOnColour.main',
                            padding: '1px',
                            textAlign: 'left',
                        }}
                    >
                        <Checkbox
                            key={Math.random()}
                            defaultChecked={!!this.state.done}
                            onChange={this.handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            size="large" />
                    </TableCell>
                    <TableCell
                        sx={{ color: 'textOnColour.main', textAlign: 'right' }}
                    >
                        <Button
                            onClick={() => this.props.deleteAssignmentCallback({
                                id: this.state.id,
                            })}
                            color="primary"
                            variant="contained"
                        >
                            {/* <Delete fontSize="medium" sx={{color: "textOnColour.main"}}/> */}
                            <Typography variant="button">Delete</Typography>
                        </Button>
                    </TableCell>
                </TableRow>
            </>
        );
    }
}
