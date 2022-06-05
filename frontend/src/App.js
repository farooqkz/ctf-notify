import React from "react";
import Current from "./Current";
import Notif from "./Notif";
import Paper from "@mui/material/Paper";
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";

function App() {
  return (
    <Paper>
      <Current />
      <Divider>
        <Typography variant="h5">Notifications</Typography>
      </Divider>
      <Notif />
    </Paper>
  );
}

export default App;
