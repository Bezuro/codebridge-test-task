import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#363636',
    },
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#363636',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    h3: {
      fontSize: '1.5rem',
      lineHeight: 1.22,
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.21875,
    },
    caption: {
      lineHeight: 1.5,
      fontSize: 14,
      opacity: 0.6,
    },
  },
});

export default theme;
