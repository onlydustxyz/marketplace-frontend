extern crate dotenv;

pub mod application;
pub mod dto;

pub mod event_listeners;

mod graphql;
mod routes;

use crate::{application::*, graphql::Query, routes::graphql::Schema};
use anyhow::Result;
use dotenv::dotenv;
use juniper::{EmptyMutation, EmptySubscription};
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
	let contribution_repository: AggregateRootRepository<Contribution> =
		AggregateRootRepository::new(database.clone());
	let graphql_schema = Schema::new(Query, EmptyMutation::new(), EmptySubscription::new());

	let rocket_handler = inject_app(
		rocket::build(),
		database.clone(),
		starknet_account_verifier,
		contribution_repository,
		uuid_generator,
		github_client.clone(),
		Arc::new(Bus::default().await?),
	)
	.manage(database.clone())
	.manage(github_client)
	.manage(graphql_schema)
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
		openapi_get_routes![
			routes::new_project,
			routes::list_projects,
			routes::refresh_projects,
			routes::apply_to_contribution,
			routes::refuse_contributor_application,
			routes::list_applications,
			routes::refresh_applications,
			routes::list_contributor_applications,
			routes::refresh_contributions,
			routes::get_contributions,
			routes::contributors::refresh_contributors,
			routes::contributors::get_contributor_by_account,
			routes::contributors::associate_github_account,
			routes::contributors::register_discord_handle,
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
	database: Arc<database::Client>,
	starknet_account_verifier: Arc<starknet_account_verifier::StarkNetClient>,
	contribution_repository: AggregateRootRepository<Contribution>,
	uuid_generator: Arc<dyn UuidGenerator>,
	github_client: Arc<github::Client>,
	event_bus: Arc<Bus>,
) -> Rocket<Build> {
	let application_projector: Arc<ApplicationProjector> =
		Arc::new(ApplicationProjector::new(database.clone()));

	let contribution_projector = Arc::new(GithubContributionProjector::new(
		database.clone(),
		github_client.clone(),
	));

	let project_projector = Arc::new(GithubProjectProjector::new(
		github_client.clone(),
		database.clone(),
	));

	let project_member_projector = Arc::new(ProjectMemberProjector::new(database.clone()));
	let lead_contributor_projector = Arc::new(LeadContributorProjector::new(database.clone()));

	let contributor_projector = Arc::new(ContributorWithGithubDataProjector::new(
		github_client.clone(),
		database.clone(),
	));

	rocket
		.manage(ApplyToContribution::new_usecase_boxed(
			contribution_repository.clone(),
			event_bus.clone(),
			uuid_generator.clone(),
		))
		.manage(RefuseApplication::new_usecase_boxed(
			contribution_repository,
			event_bus.clone(),
			uuid_generator.clone(),
		))
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
		.manage(RefreshContributions::new(
			database.clone(),
			contribution_projector,
			database.clone(),
		))
		.manage(RefreshApplications::new(
			database.clone(),
			application_projector,
			database.clone(),
		))
		.manage(RefreshProjects::new(
			database.clone(),
			project_projector,
			database.clone(),
		))
		.manage(RefreshProjectsMembers::new(
			database.clone(),
			project_member_projector,
			database.clone(),
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
		.manage(database.clone() as Arc<dyn ApplicationProjectionRepository>)
		.manage(database.clone() as Arc<dyn ContributionProjectionRepository>)
		.manage(database.clone() as Arc<dyn ContributorProjectionRepository>)
		.manage(database.clone() as Arc<dyn ProjectMemberProjectionRepository>)
		.manage(database.clone() as Arc<dyn LeadContributorProjectionRepository>)
		.manage(database as Arc<dyn ProjectProjectionRepository>)
}
