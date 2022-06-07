import React from "react";
import Current from "./Current";
import Notif from "./Notif";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

function App() {
  return (
    <Paper>
      <Current />
      <Divider>
        <Typography variant="h5">Notifications</Typography>
      </Divider>
      <Notif />
      <Divider>
        <Typography>A work by Farooq Karimi Zadeh</Typography>
        <a href="https://github.com/farooqkz/ctf-notify">Source</a>
      </Divider>
    </Paper>
  );
}

export default App;
