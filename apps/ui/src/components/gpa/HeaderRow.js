import { TableCell, TableRow } from '@mui/material';
import React from 'react';

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
                <TableCell key={column}>
                    <b>{column}</b>
                </TableCell>
            );
        });
        return <TableRow>{cells}</TableRow>;
    }
}
