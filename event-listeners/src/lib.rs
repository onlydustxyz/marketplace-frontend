use anyhow::Result;
use futures::future::try_join_all;
use marketplace_infrastructure::{
	database::{self, init_pool},
	github,
};
use std::sync::Arc;

mod presentation;
use presentation::{graphql, http, listeners};

pub async fn main() -> Result<()> {
	let database = Arc::new(database::Client::new(init_pool()?));
	let github = Arc::new(github::Client::new());
	let reqwest = reqwest::Client::new();

	let web_server = http::server(http::port()?, graphql::Context::new);

	let mut handles = vec![tokio::spawn(web_server)];
	handles.extend(listeners::spawn_all(database, github, reqwest).await?);
	try_join_all(handles).await?;

	Ok(())
}
