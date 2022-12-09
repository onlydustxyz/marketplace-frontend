use crate::{
	application,
	domain::{Permissions, ProjectDetails, UserInfo},
};
use domain::{
	AggregateRootRepository, Budget, EntityRepository, Event, Payment, Publisher, UniqueMessage,
	UserRepository, UuidGenerator,
};
use presentation::http::guards::OptionUserId;
use std::sync::Arc;

pub struct Context {
	pub caller_permissions: Box<dyn Permissions>,
	pub maybe_user_id: OptionUserId,
	pub request_payment_usecase: application::payment::request::Usecase,
	pub process_payment_usecase: application::payment::process::Usecase,
	pub create_project_usecase: application::project::create::Usecase,
	pub update_project_usecase: application::project::update::Usecase,
	pub user_info_repository: Arc<dyn EntityRepository<UserInfo>>,
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
		user_repository: Arc<dyn UserRepository>,
		project_details_repository: Arc<dyn EntityRepository<ProjectDetails>>,
		user_info_repository: Arc<dyn EntityRepository<UserInfo>>,
	) -> Self {
		Self {
			caller_permissions,
			maybe_user_id,
			request_payment_usecase: application::payment::request::Usecase::new(
				uuid_generator.to_owned(),
				event_publisher.to_owned(),
				user_repository,
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
			),
			update_project_usecase: application::project::update::Usecase::new(
				project_details_repository,
			),
			user_info_repository,
		}
	}
}

impl juniper::Context for Context {}
