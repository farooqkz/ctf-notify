import React from "react";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { modes, maps } from "./utils";

export default class Notif extends React.Component {
  fetchPushers = () => {
    fetch(window.SERVER + "pushers").then(r => r.json()).then((j) => {
      this.pushers = j.pushers;
      this.setState({ pushersCount: j.pushers.length });
    });
  };
  
  addNotif = () => { 
    this.maps.map((map) => {
      fetch(window.SERVER + "pushers",
        {
          method: "POST",
          body: JSON.stringify({
            players: this.players,
            mode: this.mode,
            map: map,
            pusher: "MEow",
          }),
          headers: { "content-type": "application/json" },
        })
    });
    // TODO: fetchPushers should happen after all are submitted not here
    this.fetchPushers();
    this.setState({ addNotif: false });
  };
  
  deletePusher = (id) => {
    fetch(window.SERVER + `pushers/${id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        this.fetchPushers();
      } else {
        alert("An error occured while deleting");
      }
    });
  };
  constructor(props) {
    super(props);
    this.pushers = [];
    this.mode = "classes";
    this.maps = [];
    this.players = 10;
    this.state = {
      addNotif: false,
      pushersCount: 0,
    }
  }

  componentDidMount() {
    this.fetchPushers();
  }

  render() {
    const { addNotif, pushersCount } = this.state;
    return (
      <>
      <Dialog open={addNotif} onClose={() => this.setState({ addNotif: false })}>
        <DialogTitle>
          Notifying you when certain map(s) with enough players is being played
        </DialogTitle>
        <DialogContent>
          <Select defaultValue={this.mode} label="Game mode" onChange={(evt) => { this.mode = evt.target.value }}>
            {Object.entries(modes).map((m) => <MenuItem key={m[0]} value={m[0]}>{m[1]}</MenuItem>)}
          </Select>
          <TextField
            defaultValue={this.players}
            type="number"
            onChange={(evt) => { this.players = evt.target.value }}
          />
          <Autocomplete
            multiple
            fullWidth
            disableCloseOnSelect
            defaultValue={this.maps}
            options={Object.entries(maps)}
            onChange={(_, value) => {
              this.maps = value.map(m => m[0]);
            }}
            getOptionLabel={(option) => option[1]}
            renderOptions={(props, map, { selected }) => {
              return (
                <li {...props}>
                  <Checkbox checked={selected} /> {map}
                </li>
              );
            }}
            renderInput={(params) => {
              return (
                <TextField {...params} label="Maps" placeholder="Select maps" />
              );
            }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.addNotif}>
            Add notification
          </Button>
        </DialogActions>
      </Dialog>
      <Stack>
        <Fab size="medium" onClick={() => this.setState({ addNotif: true })}>
          <AddIcon />
        </Fab>
        { pushersCount === 0 ?
            <Typography align="center">No notification</Typography>
            :
            (
              <List>
                {this.pushers.map((pusher) => {
                  return (
                  <ListItem secondaryAction={
                    <IconButton onClick={() => this.deletePusher(pusher.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }>
                    <ListItemIcon>
                      <img
                        style={{ height: "85px", width: "128px", margin: "1vw" }}
                        src={window.SERVER + "mapthumbnails/" + pusher.map}
                        alt={pusher.map}
                      />
                    </ListItemIcon>
                    <ListItemText primary={`When ${pusher.players} online with ${pusher.mode}`} secondary={maps[pusher.map]} />
                  </ListItem>
                  );
                })}
              </List>
            ) }
      </Stack>
      </>
    );
  }
};
