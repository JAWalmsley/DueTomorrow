import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';
import { indigo } from '@mui/material/colors';

import { AssignmentTable } from './assignments/AssignmentTable.js';

export default function CourseShareBox(props) {
    return (
        <Card elevation={1}>
            <CardContent
                style={{
                    backgroundColor: props.colour,
                }}
            >
                <Typography
                    variant="h4"
                    component="div"
                    color="textOnColour.main"
                >
                    {props.name}
                </Typography>
                <Typography color="textOnColour.main">
                    {props.credits} credits
                </Typography>
            </CardContent>
            <Table>
                <TableBody>
                    {props.assignments.map((assignment) => (
                        <TableRow>
                            <TableCell>{assignment.name}</TableCell>
                            <TableCell>{assignment.due}</TableCell>
                            <TableCell>{assignment.weight}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CardActions>
                <Grid container justifyContent={'flex-end'}>
                    <Button variant="contained">Import</Button>
                </Grid>
            </CardActions>
        </Card>
    );
}
