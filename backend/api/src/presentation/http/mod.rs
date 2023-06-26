use std::sync::Arc;

use ::domain::{AggregateRootRepository, Project};
use anyhow::Result;
use http::Config;
use infrastructure::{
	amqp::{self, CommandPublisher},
	database::{ImmutableRepository, Repository},
	github,
	web3::ens,
};
use presentation::http;

use crate::{infrastructure::simple_storage, models::*, presentation::graphql};

pub mod dto;
mod error;
pub mod roles;
mod routes;

#[allow(clippy::too_many_arguments)]
pub async fn serve(
	config: Config,
	schema: graphql::Schema,
	command_bus: Arc<CommandPublisher<amqp::Bus>>,
	project_repository: AggregateRootRepository<Project>,
	project_details_repository: Arc<dyn Repository<ProjectDetails>>,
	sponsor_repository: Arc<dyn Repository<Sponsor>>,
	project_sponsor_repository: Arc<dyn ImmutableRepository<ProjectsSponsor>>,
	pending_project_leader_invitations_repository: Arc<
		dyn ImmutableRepository<PendingProjectLeaderInvitation>,
	>,
	ignored_github_issues_repository: Arc<dyn ImmutableRepository<IgnoredGithubIssue>>,
	user_info_repository: Arc<dyn Repository<UserPayoutInfo>>,
	user_profile_info_repository: Arc<dyn UserProfileInfoRepository>,
	contact_informations_repository: Arc<dyn ContactInformationsRepository>,
	terms_and_conditions_acceptance_repository: Arc<dyn Repository<TermsAndConditionsAcceptance>>,
	graphql: Arc<infrastructure::graphql::Client>,
	github: Arc<github::Client>,
	ens: Arc<ens::Client>,
	simple_storage: Arc<simple_storage::Client>,
	bus: Arc<amqp::Bus>,
) -> Result<()> {
	let _ = rocket::custom(http::config::rocket("backend/api/Rocket.toml"))
		.manage(config)
		.manage(schema)
		.manage(command_bus)
		.manage(project_repository)
		.manage(project_details_repository)
		.manage(sponsor_repository)
		.manage(project_sponsor_repository)
		.manage(pending_project_leader_invitations_repository)
		.manage(ignored_github_issues_repository)
		.manage(user_info_repository)
		.manage(terms_and_conditions_acceptance_repository)
		.manage(user_profile_info_repository)
		.manage(contact_informations_repository)
		.manage(graphql)
		.manage(github)
		.manage(ens)
		.manage(simple_storage)
		.manage(bus)
		.mount("/", routes![http::routes::health_check,])
		.mount(
			"/",
			routes![
				routes::graphql::graphiql,
				routes::graphql::get_graphql_handler,
				routes::graphql::post_graphql_handler
			],
		)
		.mount("/", routes![routes::user::profile_picture])
		.launch()
		.await?;

	Ok(())
}
