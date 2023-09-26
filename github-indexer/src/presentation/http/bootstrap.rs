use std::sync::Arc;

use anyhow::Result;
use infrastructure::{database, github};
use olog::info;
use rocket::{Build, Rocket};

use crate::{presentation::http, Config};

pub async fn bootstrap(config: Config) -> Result<Rocket<Build>> {
	info!("Bootstrapping backend event-listeners api");

	let database = Arc::new(database::Client::new(database::init_pool(
		config.database.clone(),
	)?));

	let github: Arc<github::Client> = github::RoundRobinClient::new(config.github.clone())?.into();

	let rocket_build = http::serve(config.http, database, github);
	Ok(rocket_build)
}
