extern crate dotenv;

mod application;
mod domain;
mod graphql;
mod infrastructure;
mod routes;

use ::domain::*;
use ::infrastructure::{
	amqp::Bus,
	database::{self, init_pool},
};
use anyhow::Result;
use dotenv::dotenv;
use log::info;
use rocket::routes;
use rocket_okapi::swagger_ui::make_swagger_ui;
use std::sync::Arc;
use tracing::instrument;

#[macro_use]
extern crate rocket;

#[instrument]
pub async fn main() -> Result<()> {
	dotenv().ok();

	let database = Arc::new(database::Client::new(init_pool()?));
	database.run_migrations()?;

	let uuid_generator = Arc::new(RandomUuidGenerator);
	let event_bus = Arc::new(Bus::default().await?);
	let graphql_schema = graphql::create_schema();
	let graphql_context = graphql::Context::new(uuid_generator.clone(), event_bus.clone());

	let rocket_handler = rocket::build()
		.manage(database.clone())
		.manage(graphql_schema)
		.manage(graphql_context)
		.attach(routes::cors::Cors)
		.mount(
			"/",
			routes![
				routes::cors::options_preflight_handler,
				routes::health::health_check,
			],
		)
		.mount(
			"/",
			routes![
				routes::graphql::graphiql,
				routes::graphql::get_graphql_handler,
				routes::graphql::post_graphql_handler
			],
		)
		.mount("/swagger", make_swagger_ui(&routes::get_docs()))
		.launch();

	let (rocket_result,) = tokio::join!(rocket_handler);
	let _ = rocket_result?;

	info!("👋 Gracefully shut down");
	Ok(())
}
