// CODEX: MUI Theme for Android-like FeverEducation UI
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3', // Android blue
    },
    secondary: {
      main: '#00e676', // Android green
    },
    background: {
      default: '#181c20',
      paper: '#23272f',
    },
    text: {
      primary: '#fff',
      secondary: '#b0b8c1',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 24px 0 rgba(33,150,243,0.07)',
        },
      },
    },
  },
});

export default theme;
