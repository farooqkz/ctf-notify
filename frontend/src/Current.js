import React from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import "./Current.css";


let friendlyName = {
  nade_fight: "Nade fight",
  classic: "Classic",
  classes: "Classes",
};


function timeFormatted(t) {
  let s = t, m = 0, h = 0;
  s = t;
  while (s >= 60) {
    m++;
    s -= 60;
  }
  while (m >= 60) {
    h++;
    m -= 60;
  }
  s = s.toString();
  s = s.length === 1 ? "0" + s : s;
  m = m.toString();
  m = m.length === 1 ? "0" + m : m;
  h = h.toString();
  h = h.length === 1 ? "0" + h : h;
  return `${h}:${m}:${s}`;
}

export default class Current extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wait: true,
      error: false,
      currentMap: "",
      currentMapT: "",
      players: 0,
      currentMode: "",
      timeStarted: 0,
      timeElasped: 0,
    };
  }
  
  componentDidMount() {
    setInterval(() =>
      fetch(window.SERVER + "stats").then((r) => {
        if (r.ok) {
          r.json().then((j) => {
            this.setState({
              currentMap: j.map,
              currentMapT: j.map_technical,
              wait: false,
              players: j.players,
              currentMode: j.mode,
              timeStarted: j.start_time,
            });
          });
        } else {
          this.setState({ error: true });
        }
    }), 10000);
    
    setInterval(() => this.setState((state) => {
      state.timeElasped = Math.round(Date.now() / 1000 - state.timeStarted);
      return state;
    }), 900);
  }

  render() {
    const { timeElasped, players, wait, error, currentMap, currentMode, currentMapT } = this.state;
    if (error) {
      return (
        <Typography align="center" variant="h4">Something went wrong. Maybe reload the page?</Typography>
      );
    }
    if (wait) {
    return (
      <div className="wait">
        <CircularProgress />
      </div>
    );
  }
  return (
    <Stack spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem />}>
      <img alt={currentMapT} src={window.SERVER + "mapthumbnail/" + currentMapT} />
      <Stack>
        <Typography>Current mode</Typography>
        <Typography variant="h6">{friendlyName[currentMode]}</Typography>
        <Typography>Current map</Typography>
        <Typography variant="h6">{currentMap}</Typography>
        <Typography>Players online</Typography>
        <Typography variant="h6">{players}</Typography>
        <Typography>Time elasped</Typography>
        <Typography variant="h6">{timeFormatted(timeElasped)}</Typography>
      </Stack>
    </Stack>
  );

  }
};
