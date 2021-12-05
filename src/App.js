import "./assets/css/main.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Head from "./layout/Head";
import Foot from "./layout/Foot";
import Main from "./component/Main";
const theme = createTheme();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Head />
        <Main />
        <Foot />
      </div>
    </ThemeProvider>
  );
}

export default App;
