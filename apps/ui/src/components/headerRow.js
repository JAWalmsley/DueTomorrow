import { TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

/**
 * Header of a table
 * @param columns
 */
export class HeaderRow extends React.Component {
    render() {
        const cells = [];
        this.props.columns.forEach((column) => {
            cells.push(
                <TableCell key={column}>
                    <Typography><b>{column}</b></Typography>
                </TableCell>
            );
        });
        return (
            <TableHead>
                <TableRow>{cells}</TableRow>
            </TableHead>
        );
    }
}