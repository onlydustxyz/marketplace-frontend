extern crate dotenv;

mod application;
mod domain;
mod graphql;
mod infrastructure;
mod routes;

use crate::domain::ProjectDetailsRepository;
use ::domain::{
	AggregateRootRepository, Event, Payment, Project, Publisher, RandomUuidGenerator,
	UniqueMessage, UserRepository, UuidGenerator,
};
use ::infrastructure::{
	amqp::Bus,
	database::{self, init_pool},
	graphql::HasuraClient,
};
use anyhow::Result;
use dotenv::dotenv;
use log::info;
use rocket::{routes, Build, Rocket};
use rocket_okapi::swagger_ui::make_swagger_ui;
use std::sync::Arc;
use tracing::instrument;

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate derive_new;

#[instrument]
pub async fn main() -> Result<()> {
	dotenv().ok();

	let database = Arc::new(database::Client::new(init_pool()?));
	database.run_migrations()?;

	let rocket_handler = inject_app(
		rocket::build(),
		graphql::create_schema(),
		Arc::new(RandomUuidGenerator),
		Arc::new(Bus::default().await?),
		AggregateRootRepository::new(database.clone()),
		AggregateRootRepository::new(database.clone()),
		Arc::new(HasuraClient::default()),
		database.clone(),
	)
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

#[allow(clippy::too_many_arguments)]
fn inject_app(
	rocket: Rocket<Build>,
	schema: graphql::Schema,
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
	payment_repository: AggregateRootRepository<Payment>,
	user_repository: Arc<dyn UserRepository>,
	project_details_repository: Arc<dyn ProjectDetailsRepository>,
) -> Rocket<Build> {
	rocket
		.manage(schema)
		.manage(uuid_generator)
		.manage(event_publisher)
		.manage(project_repository)
		.manage(payment_repository)
		.manage(user_repository)
		.manage(project_details_repository)
}
