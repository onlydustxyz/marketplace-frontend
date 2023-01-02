use std::sync::Arc;

use domain::{AggregateRootRepository, Event, Payment, Project, Publisher, UniqueMessage};
use infrastructure::github;
use presentation::http::guards::OptionUserId;

use crate::{
	application,
	domain::{ArePayoutSettingsValid, Permissions},
	infrastructure::{
		database::{ProjectDetailsRepository, UserInfoRepository},
		web3::ens,
	},
};

pub struct Context {
	pub caller_permissions: Box<dyn Permissions>,
	pub maybe_user_id: OptionUserId,
	pub request_payment_usecase: application::payment::request::Usecase,
	pub process_payment_usecase: application::payment::process::Usecase,
	pub create_project_usecase: application::project::create::Usecase,
	pub remove_project_leader_usecase: application::project::remove_leader::Usecase,
	pub update_project_github_repo_id_usecase: application::project::update_github_repo_id::Usecase,
	pub project_details_repository: ProjectDetailsRepository,
	pub update_user_info_usecase: application::user::update_profile_info::Usecase,
}

impl Context {
	#[allow(clippy::too_many_arguments)]
	pub fn new(
		caller_permissions: Box<dyn Permissions>,
		maybe_user_id: OptionUserId,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		payment_repository: AggregateRootRepository<Payment>,
		project_repository: AggregateRootRepository<Project>,
		project_details_repository: ProjectDetailsRepository,
		user_info_repository: UserInfoRepository,
		github: Arc<github::Client>,
		ens: Arc<ens::Client>,
	) -> Self {
		Self {
			caller_permissions,
			maybe_user_id,
			request_payment_usecase: application::payment::request::Usecase::new(
				event_publisher.to_owned(),
				project_repository.clone(),
			),
			process_payment_usecase: application::payment::process::Usecase::new(
				event_publisher.to_owned(),
				payment_repository,
			),
			create_project_usecase: application::project::create::Usecase::new(
				event_publisher.to_owned(),
				project_details_repository.clone(),
				github.clone(),
			),
			remove_project_leader_usecase: application::project::remove_leader::Usecase::new(
				event_publisher.to_owned(),
				project_repository.clone(),
			),
			update_project_github_repo_id_usecase:
				application::project::update_github_repo_id::Usecase::new(
					event_publisher.to_owned(),
					project_repository,
					github,
				),
			project_details_repository,
			update_user_info_usecase: application::user::update_profile_info::Usecase::new(
				user_info_repository,
				ArePayoutSettingsValid::new(ens),
			),
		}
	}
}

impl juniper::Context for Context {}
