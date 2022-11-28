/* existing imports */
import Home from './routes/home';
import GPAPage from './routes/gpaPage';
import ErrorPage from './routes/error-page';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#5c6bc0',
        },
        secondary: {
            main: '#4db6ac',
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gpa" element={<GPAPage />} />
            </Routes>
        </Router>
    </ThemeProvider>
);
