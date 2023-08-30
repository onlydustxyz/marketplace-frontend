use anyhow::Result;
use olog::info;
use rocket::{Build, Rocket};

use crate::{presentation::http, Config};

pub async fn bootstrap(config: Config) -> Result<Rocket<Build>> {
	info!("Bootstrapping backend event-listeners api");

	let rocket_build = http::serve(config.http);
	Ok(rocket_build)
}
