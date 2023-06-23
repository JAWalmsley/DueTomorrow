import {
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';

import { APIAssignmentPost, APICoursesPost } from '../api.js';
import React, { useCallback, useState } from 'react';

export default function CourseShareBox(props) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const importCourse = useCallback((loggedin, course, assignments) => {
        if (!loggedin) {
            window.location.replace(
                '/login?redirect=' +
                    window.location.pathname +
                    window.location.search
            );
        }
        setSnackbarOpen(true);
        // TODO: REMEMBER TO UNCOMMENT THIS
        // let userid = localStorage.getItem('userid');
        // let courseid = await APICoursesPost({...course, userid: userid});
        // for(let assignment of assignments) {
        //     assignment.userid = userid;
        //     assignment.courseid = courseid;
        //     APIAssignmentPost(assignment);
        // }
    }, []);

    return (
        <>
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
                        <Button
                            variant="contained"
                            onClick={() =>
                                importCourse(
                                    props.loggedin,
                                    props,
                                    props.assignments
                                )
                            }
                        >
                            Import
                        </Button>
                    </Grid>
                </CardActions>
            </Card>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                message="Course imported"
                onClose={() => setSnackbarOpen(false)}
            />
        </>
    );
}
