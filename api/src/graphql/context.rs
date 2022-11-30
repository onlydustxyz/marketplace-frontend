use crate::{
	application,
	domain::{ProjectDetails, User},
};
use domain::{
	AggregateRootRepository, Budget, EntityRepository, Event, Payment, Project, Publisher,
	UniqueMessage, UserRepository, UuidGenerator,
};
use std::sync::Arc;

pub struct Context {
	pub user: Box<dyn User>,
	pub request_payment_usecase: application::payment::request::Usecase,
	pub process_payment_usecase: application::payment::process::Usecase,
	pub create_project_usecase: application::project::create::Usecase,
	pub assign_project_lead_usecase: application::project::assign_leader::Usecase,
}

impl Context {
	#[allow(clippy::too_many_arguments)]
	pub fn new(
		user: Box<dyn User>,
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: AggregateRootRepository<Project>,
		payment_repository: AggregateRootRepository<Payment>,
		budget_repository: AggregateRootRepository<Budget>,
		user_repository: Arc<dyn UserRepository>,
		project_details_repository: Arc<dyn EntityRepository<ProjectDetails>>,
	) -> Self {
		Self {
			user,
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
				project_details_repository,
			),
			assign_project_lead_usecase: application::project::assign_leader::Usecase::new(
				event_publisher.to_owned(),
				project_repository,
			),
		}
	}
}

impl juniper::Context for Context {}
