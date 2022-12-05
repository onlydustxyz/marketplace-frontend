#[macro_use]
extern crate diesel;

#[macro_use]
extern crate macros;

#[macro_use]
extern crate derive_new;

use std::sync::Arc;

use ::infrastructure::{amqp, config, database};
use anyhow::Result;
use futures::future::try_join_all;
use lazy_static::lazy_static;
use presentation::{graphql, http, listeners};
use serde::Deserialize;
use tokio::task::JoinHandle;

mod domain;
mod infrastructure;
mod presentation;

#[derive(Deserialize)]
pub struct Config {
	database: database::Config,
	amqp: amqp::Config,
}

lazy_static! {
	static ref CONFIG: Config =
		config::load("event-listeners/app.yaml").expect("Unable to load configuration");
}

pub async fn main() -> Result<()> {
	let reqwest = reqwest::Client::new();
	let database = Arc::new(database::Client::new(database::init_pool(
		&CONFIG.database,
	)?));

	let mut handles = vec![spawn_web_server()?];
	handles.extend(listeners::spawn_all(&CONFIG, reqwest, database).await?);
	try_join_all(handles).await?;

	Ok(())
}

fn spawn_web_server() -> Result<JoinHandle<()>> {
	let web_server = http::server(http::port()?, graphql::Context::new);

	Ok(tokio::spawn(web_server))
}
