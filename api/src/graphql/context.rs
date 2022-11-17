use crate::application;
use domain::{Publisher, UuidGenerator};
use event_store::Event;
use std::sync::Arc;

pub struct Context {
	pub create_payment_usecase: application::payment::create::Usecase,
}

impl Context {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<Event>>,
	) -> Self {
		Self {
			create_payment_usecase: application::payment::create::Usecase::new(
				uuid_generator,
				event_publisher,
			),
		}
	}
}

impl juniper::Context for Context {}
