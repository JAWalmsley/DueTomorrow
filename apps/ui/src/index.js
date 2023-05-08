/* existing imports */
import { Home } from './routes/home';
import GPAPage from './routes/gpaPage';
import LoginPage from './routes/loginPage';
import CoursePage from './routes/coursePage';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#5c6bc0',
        },
        secondary: {
            main: '#4db6ac',
        },
    },
});

theme = responsiveFontSizes(theme);
theme.typography.fontSize = 50;

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gpa" element={<GPAPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/courses" element={<CoursePage />} />
            </Routes>
        </Router>
    </ThemeProvider>
);
