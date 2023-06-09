use serde::Deserialize;

#[derive(Deserialize, Clone)]
pub struct AppConfig {
    pub listen_addr_unix: Option<String>,
    pub listen_addr_tcp: Option<String>,
    pub ctf_api_addr: String,
    pub minetest_server_list_api: Option<String>,
    pub log_level: Option<String>, // WARN | INFO | ERROR | DEBUG
    pub cache_timeout: Option<usize>, // in seconds
}
