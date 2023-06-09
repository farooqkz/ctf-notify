use crate::config::AppConfig;
use crate::api::get_stats;


pub fn pushit(config: &AppConfig) -> Result<()> {
    let current_stats = stats(config)?;
    // ...
    todo!();
}
