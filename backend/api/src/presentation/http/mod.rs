use std::sync::Arc;

use ::domain::{AggregateRootRepository, Project};
pub use http::Config;
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
	presentation::{graphql, http::github_client_pat_factory::GithubClientPatFactory},
};

pub mod dto;
mod error;
pub mod github_client_pat_factory;
mod option_github_pat;
pub mod roles;
pub mod routes;

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
	github_api_client: Arc<github::Client>,
	dusty_bot_api_client: Arc<github::Client>,
	ens: Arc<ens::Client>,
	simple_storage: Arc<simple_storage::Client>,
	bus: Arc<amqp::Bus>,
	github_client_pat_factory: Arc<GithubClientPatFactory>,
) -> Rocket<Build> {
	let create_project_usecase = application::project::create::Usecase::new(
		bus.clone(),
		project_details_repository.clone(),
		simple_storage.clone(),
	);

	let update_user_profile_info_usecase = application::user::update_profile_info::Usecase::new(
		user_profile_info_repository.clone(),
		contact_informations_repository.clone(),
		simple_storage.clone(),
	);

	let create_github_issue_usecase = application::dusty_bot::create_and_close_issue::Usecase::new(
		project_repository.clone(),
		dusty_bot_api_client,
		github_api_client.clone(),
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
		.manage(github_api_client)
		.manage(ens)
		.manage(simple_storage)
		.manage(bus)
		.manage(create_project_usecase)
		.manage(update_user_profile_info_usecase)
		.manage(create_github_issue_usecase)
		.manage(github_client_pat_factory)
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
		.mount(
			"/",
			routes![
				routes::users::profile_picture,
				routes::users::update_user_profile,
				routes::users::fetch_user_details_by_id,
				routes::users::search_users,
			],
		)
		.mount("/", routes![routes::projects::create_project])
		.mount(
			"/",
			routes![
				routes::issues::create_and_close_issue,
				routes::issues::fetch_issue_by_repo_owner_name_issue_number,
				routes::issues::fetch_issue_by_repository_id_issue_number,
			],
		)
		.mount(
			"/",
			routes![
				routes::pull_requests::fetch_pull_requests::fetch_pull_request,
				routes::pull_requests::fetch_pull_requests::fetch_pull_request_by_repository_id,
			],
		)
}
