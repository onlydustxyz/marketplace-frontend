extern crate diesel;

use anyhow::Result;
use futures::future::try_join_all;
use presentation::{graphql, http, listeners};
use tokio::task::JoinHandle;

mod domain;
mod presentation;

pub async fn main() -> Result<()> {
	let reqwest = reqwest::Client::new();

	let mut handles = vec![spawn_web_server()?];
	handles.extend(listeners::spawn_all(reqwest).await?);
	try_join_all(handles).await?;

	Ok(())
}

fn spawn_web_server() -> Result<JoinHandle<()>> {
	let web_server = http::server(http::port()?, move || graphql::Context::new());

	Ok(tokio::spawn(web_server))
}
