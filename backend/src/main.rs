mod config;
mod pusher;
mod cleanup;
mod api;

use std::env::args;

use axum::{
    routing::{get, post},
    Json, Router,
};
use axum_sessions::{
    async_session::MemoryStore,
    extractors::{ReadableSession, WritableSession},
    SessionLayer,
};

use crate::api::get_stats;
use crate::config::AppConfig;
use crate::pusher::pushit;
use crate::cleanup::cleanup;


#[tokio::main]
async fn main() -> anyhow::Result<()> {
    if let Some(command) = args().nth(2) {
        match command {
            "run" => {
                todo!()
            }
            "push" => {
                return pushit().await;
            }
            "clean" => {
                return cleanup().await;
            }
        }
    } else {
        panic!("./ctf-notify </path/to/config.toml> <run|push|clean>");
    }
}
