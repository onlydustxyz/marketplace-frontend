use std::sync::Arc;

use ::domain::{AggregateRootRepository, Project};
use http::Config;
use infrastructure::{
	amqp::{self, CommandPublisher},
	database::{ImmutableRepository, Repository},
	github,
};
use presentation::http;
use rocket::{Build, Rocket};

use crate::{
	application,
	infrastructure::{simple_storage, web3::ens},
	models::*,
	presentation::{graphql, http::routes::projects::create_project},
};

pub mod dto;
mod error;
pub mod roles;
mod routes;

#[allow(clippy::too_many_arguments)]
pub fn serve(
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
	onboarding_repository: Arc<dyn Repository<Onboarding>>,
	graphql: Arc<infrastructure::graphql::Client>,
	github: Arc<github::Client>,
	ens: Arc<ens::Client>,
	simple_storage: Arc<simple_storage::Client>,
	bus: Arc<amqp::Bus>,
) -> Rocket<Build> {
	let create_project_usecase = application::project::create::Usecase::new(
		bus.to_owned(),
		project_details_repository.clone(),
		simple_storage.clone(),
	);
	rocket::custom(http::config::rocket("backend/api/Rocket.toml"))
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
		.manage(onboarding_repository)
		.manage(user_profile_info_repository)
		.manage(contact_informations_repository)
		.manage(graphql)
		.manage(github)
		.manage(ens)
		.manage(simple_storage)
		.manage(bus)
		.manage(create_project_usecase)
		.attach(http::guards::Cors)
		.mount(
			"/",
			routes![
				http::routes::health_check,
				http::routes::options_preflight_handler
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
		.mount("/", routes![routes::users::profile_picture])
		.mount("/", routes![create_project])
}
