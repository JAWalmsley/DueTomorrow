/* existing imports */
import { Home } from './routes/home';
import GPAPage from './routes/gpaPage';
import LoginPage from './routes/loginPage';
import CoursePage from './routes/coursePage';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

let theme = createTheme({
    palette: {
        primary: {
            main: '#5c6bc0',
        },
        secondary: {
            main: '#4db6ac',
        },
        mode: "dark",
    },
});

theme = responsiveFontSizes(theme);

const lgQuery = theme.breakpoints.up('lg');

theme.typography.body2.fontSize = '2rem';
theme.typography.body2[lgQuery] = {...theme.typography.body2, fontSize: '1rem' };

theme.typography.body1.fontSize = '2rem';
theme.typography.body1[lgQuery] = {...theme.typography.body1, fontSize: '1rem' };

theme.typography.h3.fontSize = '3rem';
theme.typography.h3[lgQuery] = {...theme.typography.h3, fontSize : '2rem'};

theme.typography.h6.fontSize = '1.6rem';
theme.typography.h6[lgQuery] = {...theme.typography.h6, fontSize : '1rem'};

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={''}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gpa" element={<GPAPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/courses" element={<CoursePage />} />
            </Routes>
        </Router>
    </ThemeProvider>
);
