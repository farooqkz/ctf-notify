import React from "react";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


export default class Notif extends React.Component {
  fetchPushers = () => {
    this.setState({ wait: true });
    fetch(window.SERVER + "pushers").then(r => r.json()).then((j) => {
      this.pushers = j.pushers;
      this.setState({ wait: false });
    });
  };

  constructor(props) {
    super(props);
    this.pushers = [];
    this.state = {
      wait: true,
    }
  }

  componentDidMount() {
    this.fetchPushers();
  }

  render() {
    return (
      <Stack>
        <Fab size="medium">
          <AddIcon />
        </Fab>
        { this.pushers.length === 0 ?
            <Typography align="center">No notification</Typography>
            :
            (
              <List>
                {this.pushers.map((pusher) => {
                  return (
                  <ListItem secondaryAction={
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  }>
                    <ListItemIcon>
                      <img src={window.SERVER + "mapthumbnail/" + pusher.map} />
                    </ListItemIcon>
                    <ListItemText primary={`When ${pusher.players} online`} secondary={pusher.map} />
                  </ListItem>
                  );
                })}
              </List>
            ) }
      </Stack>
    );
  }
};
