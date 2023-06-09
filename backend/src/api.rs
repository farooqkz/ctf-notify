use serde::Deserialize;

#[derive(Deserialize, Clone)]
pub struct CTFStats {
    map_technical: String,
    map: String,
    mode: String,
    start_time: usize,
}

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

pub async fn get_stats(config: &AppConfig) -> anyhow::Result<Stats> {
    let server_list = reqwest::get(server_list_api).await?.json::<ServerList>().await?;
    let server = server_list.list.filter(|serv| serv.address == config.ctf_server_addr).last()?;
    let ctf_stat = reqwest::get(config.ctf_api_addr).await?.json::<CTFStats>().await?;
    Ok(Stats {
        start_time: ctf_stat.start_time,
        mode: ctf_stat.mode,
        current_map_title: ctf_stat.map,
        current_map_technical: ctf_stat.map_technical,
        players: server.clients_list
    })
}
