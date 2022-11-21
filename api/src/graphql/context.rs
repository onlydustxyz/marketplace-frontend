use crate::application;
use domain::{Publisher, UuidGenerator};
use event_store::Event;
use std::sync::Arc;

pub struct Context {
	pub mark_payment_as_processed_usecase: application::payment::create::Usecase,
	pub create_project_usecase: application::project::create::Usecase,
}

impl Context {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<Event>>,
	) -> Self {
		Self {
			mark_payment_as_processed_usecase: application::payment::create::Usecase::new(
				uuid_generator.to_owned(),
				event_publisher.to_owned(),
			),
			create_project_usecase: application::project::create::Usecase::new(
				uuid_generator,
				event_publisher,
			),
		}
	}
}

impl juniper::Context for Context {}
