use serde::Deserialize;

#[derive(Deserialize, Clone)]
pub struct Stats {
    current_map_technical: String,
    current_map_title: String,
    mode: String,
    players: Vec<String>,
    start_time: usize,
}

#[derive(Deserialize, Clone)]
pub struct ServerList {
    total: Total,
    total_max: Total,
    list: Vec<Server>,
}

#[derive(Deserialize, Clone)]
pub struct Total {
    servers: usize,
    clients: usize,
}

#[derive(Deserialize, Clone)]
pub struct Server {
    address: String,
    clients: usize,
    clients_list: Vec<String>,
    creative: bool,
    damage: bool,
    description: String,
    game_time: usize,
    gameid: String,
}

pub fn get_stats() -> Stats {
    
}
