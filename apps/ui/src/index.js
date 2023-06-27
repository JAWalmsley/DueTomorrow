/* existing imports */
import { Home } from './routes/home';
import GPAPage from './routes/gpaPage';
import LoginPage from './routes/loginPage';
import CoursePage from './routes/coursePage';
import SharePage from './routes/sharePage';



import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { theme } from './generateTheme';



ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={''}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gpa" element={<GPAPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/courses" element={<CoursePage />} />
                <Route path="/share" element={<SharePage />} />
            </Routes>
        </Router>
    </ThemeProvider>
);
