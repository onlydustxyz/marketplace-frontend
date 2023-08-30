#[macro_use]
extern crate diesel;

#[macro_use]
extern crate derive;

pub mod github_indexer;
pub mod listeners;
pub mod models;

mod config;
pub use config::Config;
use tokio::task::JoinHandle;

pub const GITHUB_EVENTS_EXCHANGE: &str = "github-events";

use std::sync::Arc;

use anyhow::Result;
use infrastructure::database;

pub async fn bootstrap(config: Config) -> Result<Vec<JoinHandle<()>>> {
	let reqwest = reqwest::Client::new();
	let database = Arc::new(database::Client::new(database::init_pool(
		config.database.clone(),
	)?));

	listeners::spawn_all(config, reqwest, database).await
}
