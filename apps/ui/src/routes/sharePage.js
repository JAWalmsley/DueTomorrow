import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Paper,
    Typography,
} from '@mui/material';
import { Grid } from '@mui/material';
import { Navbar } from '../components/Navbar.js';
import { useSearchParams } from 'react-router-dom';
import { APICoursesGetByCode } from '../api.js';
import { useEffect, useState } from 'react';

import React from 'react';
import { indigo } from '@mui/material/colors';

import CourseShareBox from '../components/CourseShareBox.js';

export default function SharePage() {
    const [courses, setCourses] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    let shareCode = searchParams.get('code');
    useEffect(() => {
        async function fillCourses() {
            console.log('fgettin courses');
            let c = await APICoursesGetByCode(shareCode);
            setCourses(c.courses);
            console.log('got ', c);
        }
        if (!courses || courses.length === 0) {
            console.log('filling...');
            fillCourses();
        } else {
            console.log(courses);
        }
    });
    console.log(courses);
    return (
        <>
            <Navbar />
            <Container>
                <Card elevation={1}>
                    <CardContent>
                        <Typography>
                            Log in to import the courses below
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="flex-end">
                            <Button
                                size="large"
                                color="primary"
                                variant="contained"
                            >
                                Import
                            </Button>
                        </Grid>
                    </CardActions>
                </Card>
                <Grid container spacing={2} padding={1}>
                    {courses.map((course) => (
                        <Grid item xs={6}>
                            <CourseShareBox
                                name={course.name}
                                colour={course.colour}
                                credits={course.credits}
                                assignments={course.assignments}
                                key={course.name}
                            ></CourseShareBox>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
