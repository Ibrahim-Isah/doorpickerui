import "./assets/css/main.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import AllRoutes from "./AllRoutes";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
    typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: ['"Lato"', "sans-serif"].join(","),
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AllRoutes />
    </ThemeProvider>
  );
}

export default App;
