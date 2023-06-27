import { createTheme, responsiveFontSizes } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { deepmerge } from '@mui/utils';

export let theme = createTheme();

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: { main: indigo[500] },
                secondary: { main: indigo[500] },
                divider: indigo[600],
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
                textOnColour: theme.palette.augmentColor({
                    color: {
                        main: '#fff',
                    },
                }),
            }
            : {
                // palette values for dark mode
                primary: { main: indigo[700] },
                secondary: { main: indigo[700] },
                divider: indigo[900],
                text: {
                    primary: grey[200],
                    secondary: grey,
                },
                textOnColour: theme.palette.augmentColor({
                    color: {
                        main: '#fff',
                    },
                }),
            }),
    },
});

theme = createTheme(getDesignTokens('dark'));
theme = deepmerge(theme, responsiveFontSizes(theme));

const lgQuery = theme.breakpoints.up('lg');

theme.typography.body2.fontSize = '2rem';
theme.typography.body2[lgQuery] = {
    ...theme.typography.body2,
    fontSize: '1rem',
};

theme.typography.body1.fontSize = '1rem';
theme.typography.body1[lgQuery] = {
    ...theme.typography.body1,
    fontSize: '1rem',
};

theme.typography.h3.fontSize = '1rem';
theme.typography.h3[lgQuery] = { ...theme.typography.h3, fontSize: '1rem' };

theme.typography.h6.fontSize = '1.6rem';
theme.typography.h6[lgQuery] = { ...theme.typography.h6, fontSize: '1rem' };