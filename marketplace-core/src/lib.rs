extern crate dotenv;

mod application;
mod graphql;
mod routes;

use anyhow::Result;
use dotenv::dotenv;
use log::info;
use marketplace_domain::*;
use marketplace_infrastructure::{
	amqp::Bus,
	database::{self, init_pool},
	github,
};
use rocket::routes;
use rocket_okapi::{openapi_get_routes, swagger_ui::make_swagger_ui};
use std::sync::Arc;
use tracing::instrument;

#[macro_use]
extern crate rocket;

#[instrument]
pub async fn main() -> Result<()> {
	dotenv().ok();

	let database = Arc::new(database::Client::new(init_pool()?));
	database.run_migrations()?;

	let github_client = Arc::new(github::Client::new());
	let uuid_generator = Arc::new(RandomUuidGenerator);
	let event_bus = Arc::new(Bus::default().await?);
	let graphql_schema = graphql::create_schema();
	let graphql_context = graphql::Context::new(uuid_generator.clone(), event_bus.clone());

	let rocket_handler = rocket::build()
		.manage(event_bus.clone() as Arc<dyn Publisher<event_store::Event>>)
		.manage(uuid_generator.clone() as Arc<dyn UuidGenerator>)
		.manage(database.clone())
		.manage(github_client)
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
		.mount(
			"/",
			openapi_get_routes![routes::payment_request::request_payment],
		)
		.mount("/swagger", make_swagger_ui(&routes::get_docs()))
		.launch();

	let (rocket_result,) = tokio::join!(rocket_handler);
	let _ = rocket_result?;

	info!("👋 Gracefully shut down");
	Ok(())
}
