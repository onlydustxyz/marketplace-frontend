mod routes;

use dotenv::dotenv;
use log::info;
use marketplace_core::application::*;
use marketplace_infrastructure::{
	database::{self, init_pool},
	github, logger, starknet, starknet_account_verifier,
};

use marketplace_domain::*;
use rocket::{routes, Build, Rocket};
use rocket_okapi::{openapi_get_routes, swagger_ui::make_swagger_ui};
use slog::{Drain, Level, Logger};
use std::sync::Arc;

#[macro_use]
extern crate rocket;

fn create_root_logger() -> Logger {
	let drain = logger::default_drain()
		.filter(|record| {
			!(record.level() == Level::Error
				&& record.msg().to_string().starts_with("No matching routes for"))
		})
		.fuse();

	logger::create_root_logger(drain)
}

#[tokio::main]
async fn main() {
	dotenv().ok();

	let _global_logger_guard = logger::set_global_logger(create_root_logger());

	github::Client::initialize();

	let database = Arc::new(database::Client::new(init_pool()));
	database.run_migrations().expect("Unable to run database migrations");

	let starknet = Arc::new(starknet::Client::default());
	let starknet_account_verifier = Arc::new(starknet_account_verifier::StarkNetClient::new());

	let github_client = Arc::new(github::Client::new());
	let uuid_generator = Arc::new(RandomUuidGenerator);
	let contribution_repository: AggregateRootRepository<Contribution> =
		AggregateRootRepository::new(database.clone());
	let contact_information_service = Arc::new(ContactInformationServiceImplementation::new(
		database.clone(),
	));

	let rocket_handler = inject_app(
		rocket::build(),
		database.clone(),
		starknet,
		starknet_account_verifier,
		contribution_repository,
		contact_information_service,
		uuid_generator,
		github_client.clone(),
	)
	.manage(database.clone())
	.manage(github_client)
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
			routes::create_contribution,
			routes::assign_contributor,
			routes::validate_contribution,
			routes::unassign_contributor,
			routes::apply_to_contribution,
			routes::refuse_contributor_application,
			routes::list_applications,
			routes::refresh_applications,
			routes::accept_application,
			routes::list_contributor_applications,
			routes::refresh_contributions,
			routes::contributors::refresh_contributors,
			routes::contributors::get_contributor,
			routes::contributors::get_contributor_by_account,
			routes::contributors::associate_github_account,
			routes::contact_information::find_contact_information,
			routes::contact_information::put_contact_information,
		],
	)
	.mount("/swagger", make_swagger_ui(&routes::get_docs()))
	.launch();

	let (rocket_result,) = tokio::join!(rocket_handler);
	let _ = rocket_result.unwrap();

	info!("Gracefully shut down");
}

#[allow(clippy::too_many_arguments)]
fn inject_app(
	rocket: Rocket<Build>,
	database: Arc<database::Client>,
	starknet: Arc<starknet::SingleAdminClient>,
	starknet_account_verifier: Arc<starknet_account_verifier::StarkNetClient>,
	contribution_repository: AggregateRootRepository<Contribution>,
	contact_information_service: Arc<dyn ContactInformationService>,
	uuid_generator: Arc<dyn UuidGenerator>,
	github_client: Arc<github::Client>,
) -> Rocket<Build> {
	let application_projector: Arc<ApplicationProjector> =
		Arc::new(ApplicationProjector::new(database.clone()));

	let contribution_projector = Arc::new(ContributionProjector::new(
		database.clone(),
		github_client.clone(),
	));

	let project_projector = Arc::new(ProjectProjector::new(
		github_client.clone(),
		database.clone(),
	));

	let project_member_projector = Arc::new(ProjectMemberProjector::new(database.clone()));
	let lead_contributor_projector = Arc::new(LeadContributorProjector::new(database.clone()));

	let contributor_projector = Arc::new(ContributorProjector::new(
		github_client.clone(),
		database.clone(),
	));

	rocket
		.manage(CreateContribution::new_usecase_boxed(starknet.clone()))
		.manage(AssignContribution::new_usecase_boxed(
			starknet.clone(),
			database.clone(),
		))
		.manage(UnassignContribution::new_usecase_boxed(
			starknet.clone(),
			database.clone(),
		))
		.manage(ApplyToContribution::new_usecase_boxed(
			contribution_repository.clone(),
			database.clone(),
			application_projector.clone(),
			contributor_projector.clone(),
			uuid_generator.clone(),
		))
		.manage(RefuseApplication::new_usecase_boxed(
			contribution_repository,
			database.clone(),
			application_projector.clone(),
			uuid_generator.clone(),
		))
		.manage(ValidateContribution::new_usecase_boxed(
			starknet.clone(),
			database.clone(),
		))
		.manage(AcceptApplication::new_usecase_boxed(
			starknet,
			database.clone(),
			database.clone(),
		))
		.manage(AssociateGithubAccount::new_usecase_boxed(
			database.clone(),
			starknet_account_verifier,
			github_client,
			contributor_projector.clone(),
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
		.manage(contact_information_service)
}
