#[macro_use]
extern crate diesel;

#[macro_use]
extern crate macros;

#[macro_use]
extern crate derive_new;

use std::sync::Arc;

use ::infrastructure::database;
use anyhow::Result;
use futures::future::try_join_all;
use presentation::{graphql, http, listeners};
use tokio::task::JoinHandle;

mod domain;
mod infrastructure;
mod presentation;

pub async fn main() -> Result<()> {
	let reqwest = reqwest::Client::new();
	let database = Arc::new(database::Client::new(database::init_pool()?));

	let mut handles = vec![spawn_web_server()?];
	handles.extend(listeners::spawn_all(reqwest, database).await?);
	try_join_all(handles).await?;

	Ok(())
}

fn spawn_web_server() -> Result<JoinHandle<()>> {
	let web_server = http::server(http::port()?, graphql::Context::new);

	Ok(tokio::spawn(web_server))
}
