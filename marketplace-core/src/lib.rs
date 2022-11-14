extern crate dotenv;

pub mod application;
pub mod dto;

pub mod event_listeners;

mod graphql;
mod routes;

use crate::application::*;
use anyhow::Result;
use dotenv::dotenv;
use log::info;
use marketplace_domain::*;
use marketplace_infrastructure::{
	amqp::Bus,
	database::{self, init_pool},
	github, starknet_account_verifier,
};
use rocket::{routes, Build, Rocket};
use rocket_okapi::{openapi_get_routes, swagger_ui::make_swagger_ui};
use std::sync::Arc;
use tracing::instrument;

#[macro_use]
extern crate rocket;

#[instrument]
pub async fn main() -> Result<()> {
	dotenv().ok();

	github::Client::initialize();

	let database = Arc::new(database::Client::new(init_pool()?));
	database.run_migrations()?;

	let starknet_account_verifier = Arc::new(starknet_account_verifier::StarkNetClient::new());

	let github_client = Arc::new(github::Client::new());
	let uuid_generator = Arc::new(RandomUuidGenerator);
	let event_bus = Arc::new(Bus::default().await?);
	let graphql_schema = graphql::create_schema();
	let graphql_context = graphql::Context::new(uuid_generator.clone(), event_bus.clone());

	let rocket_handler = inject_app(
		rocket::build(),
		database.clone(),
		starknet_account_verifier,
		uuid_generator,
		github_client.clone(),
		event_bus,
	)
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
		openapi_get_routes![routes::contributors::refresh_contributors,],
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
	database: Arc<database::Client>,
	starknet_account_verifier: Arc<starknet_account_verifier::StarkNetClient>,
	uuid_generator: Arc<dyn UuidGenerator>,
	github_client: Arc<github::Client>,
	event_bus: Arc<Bus>,
) -> Rocket<Build> {
	let lead_contributor_projector = Arc::new(LeadContributorProjector::new(database.clone()));

	let contributor_projector = Arc::new(ContributorWithGithubDataProjector::new(
		github_client.clone(),
		database.clone(),
	));

	rocket
		.manage(AssociateGithubAccount::new_usecase_boxed(
			event_bus.clone(),
			starknet_account_verifier,
			github_client,
			uuid_generator.clone(),
		))
		.manage(RegisterDiscordHandle::new_usecase_boxed(
			event_bus,
			uuid_generator,
		))
		.manage(RefreshLeadContributors::new(
			database.clone(),
			lead_contributor_projector,
			database.clone(),
		))
		.manage(RefreshContributors::new(
			database.clone(),
			contributor_projector,
			database.clone(),
		))
		.manage(database.clone() as Arc<dyn ContributorProjectionRepository>)
		.manage(database as Arc<dyn LeadContributorProjectionRepository>)
}
