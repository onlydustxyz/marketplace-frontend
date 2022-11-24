use crate::application;
use domain::{
	AggregateRootRepository, Event, Project, Publisher, UniqueMessage, UserRepository,
	UuidGenerator,
};
use std::sync::Arc;

pub struct Context {
	pub request_payment_usecase: application::payment::request::Usecase,
	pub process_payment_usecase: application::payment::process::Usecase,
	pub create_project_usecase: application::project::create::Usecase,
	pub assign_project_lead_usecase: application::project::assign_leader::Usecase,
}

impl Context {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: AggregateRootRepository<Project>,
		user_repository: Arc<dyn UserRepository>,
	) -> Self {
		Self {
			request_payment_usecase: application::payment::request::Usecase::new(
				uuid_generator.to_owned(),
				event_publisher.to_owned(),
				project_repository.to_owned(),
				user_repository,
			),
			process_payment_usecase: application::payment::process::Usecase::new(
				uuid_generator.to_owned(),
				event_publisher.to_owned(),
			),
			create_project_usecase: application::project::create::Usecase::new(
				uuid_generator.to_owned(),
				event_publisher.to_owned(),
			),
			assign_project_lead_usecase: application::project::assign_leader::Usecase::new(
				event_publisher.to_owned(),
				project_repository,
			),
		}
	}
}

impl juniper::Context for Context {}
