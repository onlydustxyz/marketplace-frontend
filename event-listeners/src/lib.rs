use anyhow::Result;
use futures::future::try_join_all;
use marketplace_infrastructure::{
	database::{self, init_pool},
	github,
};
use presentation::{graphql, http, listeners};
use std::sync::Arc;
use tokio::task::JoinHandle;

mod application;
mod domain;
mod presentation;

pub async fn main() -> Result<()> {
	let database = Arc::new(database::Client::new(init_pool()?));
	let github = Arc::new(github::Client::new());
	let reqwest = reqwest::Client::new();

	let mut handles = vec![spawn_web_server(database.clone(), github.clone())?];
	handles.extend(listeners::spawn_all(database, github, reqwest).await?);
	try_join_all(handles).await?;

	Ok(())
}

fn spawn_web_server(
	database: Arc<database::Client>,
	github: Arc<github::Client>,
) -> Result<JoinHandle<()>> {
	let web_server = http::server(http::port()?, move || {
		graphql::Context::new(database.clone(), github.clone())
	});

	Ok(tokio::spawn(web_server))
}
