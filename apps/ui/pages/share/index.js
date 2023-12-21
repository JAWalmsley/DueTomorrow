import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Navbar } from '../../src/components/Navbar.js';
import { useSearchParams } from 'react-router-dom';
import { APICoursesGetByCode } from '../../src/api.js';
import { useEffect, useState } from 'react';

import React from 'react';

import CourseShareBox from '../components/CourseShareBox.js';

export default function SharePage() {
    const [courses, setCourses] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    let shareCode = searchParams.get('code');
    useEffect(() => {
        async function fillCourses() {
            // console.log('fgettin courses');
            let c = await APICoursesGetByCode(shareCode);
            setCourses(c.courses);
            // console.log('got ', c);
        }
        if (!courses || courses.length === 0) {
            // console.log('filling...');
            fillCourses();
        } else {
            // console.log(courses);
        }
    });
    let userid = localStorage.getItem('userid');
    return (
        <>
            <Navbar loggedin={userid ? true : false} />
            <Container>
                <Grid container spacing={2} padding={1}>
                    {courses.map((course) => (
                        <Grid item xs={12}>
                            <CourseShareBox
                                name={course.name}
                                colour={course.colour}
                                credits={course.credits}
                                assignments={course.assignments}
                                key={course.name}
                                loggedin={userid ? true : false}
                            ></CourseShareBox>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
