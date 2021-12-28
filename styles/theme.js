import { blue, red } from '@mui/material/colors';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#b71c1c',
    },
    error: {
      main: '#f05545',
    },
    warning: {
      main: '#f57f17',
    },
    info: {
      main: '#1e88e5',
    },
    success: {
      main: '#43a047',
    },
  },
});

export default theme;
