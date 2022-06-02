# The RESTful API for CTF-Notify

## Overview of objects

 - Stats: Read
 - Pushers: ReadAll, Create, Delete
 - MapThumbnails: Read

### GET `/stats`

Return a Stats object:

 - `mode`(`str`): One of `nade_fight`, `classic`, `classes`
 - `players`(`int`): Number of players
 - `map`(`str`): Current map name
 - `map_technical`(`str`): Current map technical name

### GET `/pushers`

Get a list of pushers for the current session:

 - `pushers`(`array[Pusher]`): A list of Pushers for the current IP address

#### Pusher

 - `id`(`int`): A 32 bit unique random Id for the Pusher
 - `players`(`int`): Minimum number of players required for the Pusher to become active
 - `mode`(`str`): The mode required for the Pusher to become active
 - `map`(`str`): The map required for the pusher to become active

### DELETE `/pusher/<id>`

Deletes the pusher. Returns `true` if there was one and it was removed and `false` otherwise.

### GET `/mapthumbnails/<map_name>`

Redirect to Github raw content map image.
