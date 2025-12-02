import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Traininglist from "./components/Traininglist";
import Customerlist from "./components/Customerlist";
import CalendarView from "./components/CalendarView";
import "./App.css";

function App() {
  const [tab, setTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />

      <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h6" className="app-title">
            Personal trainer App
          </Typography>
        </Toolbar>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Customers" />
          <Tab label="Trainings" />
          <Tab label="Calendar View" />
        </Tabs>
      </AppBar>

      <div style={{ marginTop: "2rem" }}>
        {tab === 0 && <Customerlist />}
        {tab === 1 && <Traininglist />}
        {tab === 2 && <CalendarView />}
      </div>
    </Container>
  );
}

export default App;