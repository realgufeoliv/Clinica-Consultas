import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    palette: {
        white: "#FFFFFF",
    },
    spacing: 8,
    MuiButton: {
        styleOverrides: {
          root: {
            color: 'red',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          },
        }
    }
})

export default theme;