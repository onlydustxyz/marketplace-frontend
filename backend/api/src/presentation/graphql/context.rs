use std::sync::Arc;

use domain::{
	AggregateRootRepository, Budget, Event, Payment, Project, Publisher, UniqueMessage,
	UuidGenerator,
};
use infrastructure::github;
use presentation::http::guards::OptionUserId;

use crate::{
	application,
	domain::Permissions,
	infrastructure::database::{ProjectDetailsRepository, UserInfoRepository},
};

pub struct Context {
	pub caller_permissions: Box<dyn Permissions>,
	pub maybe_user_id: OptionUserId,
	pub request_payment_usecase: application::payment::request::Usecase,
	pub process_payment_usecase: application::payment::process::Usecase,
	pub create_project_usecase: application::project::create::Usecase,
	pub update_project_github_repo_id_usecase: application::project::update_github_repo_id::Usecase,
	pub project_details_repository: ProjectDetailsRepository,
	pub user_info_repository: UserInfoRepository,
}

impl Context {
	#[allow(clippy::too_many_arguments)]
	pub fn new(
		caller_permissions: Box<dyn Permissions>,
		maybe_user_id: OptionUserId,
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		payment_repository: AggregateRootRepository<Payment>,
		budget_repository: AggregateRootRepository<Budget>,
		project_repository: AggregateRootRepository<Project>,
		project_details_repository: ProjectDetailsRepository,
		user_info_repository: UserInfoRepository,
		github: Arc<github::Client>,
	) -> Self {
		Self {
			caller_permissions,
			maybe_user_id,
			request_payment_usecase: application::payment::request::Usecase::new(
				uuid_generator.to_owned(),
				event_publisher.to_owned(),
				budget_repository,
			),
			process_payment_usecase: application::payment::process::Usecase::new(
				uuid_generator.to_owned(),
				event_publisher.to_owned(),
				payment_repository,
			),
			create_project_usecase: application::project::create::Usecase::new(
				uuid_generator.to_owned(),
				event_publisher.to_owned(),
				project_details_repository.clone(),
				github,
			),
			update_project_github_repo_id_usecase:
				application::project::update_github_repo_id::Usecase::new(
					event_publisher.to_owned(),
					project_repository,
				),
			project_details_repository,
			user_info_repository,
		}
	}
}

impl juniper::Context for Context {}
