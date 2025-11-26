import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Customerlist from "./components/Customerlist";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography>Personal trainer App</Typography>
        </Toolbar>
      </AppBar>
      <Customerlist />
      <CssBaseline />
    </Container>
  )
}

export default App
