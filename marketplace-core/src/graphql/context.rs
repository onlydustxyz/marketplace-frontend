use crate::application;
use event_store::Event;
use marketplace_domain::{Publisher, UuidGenerator};
use std::sync::Arc;

pub struct Context {
	pub mark_payment_as_processed_usecase: application::payment::mark_as_processed::Usecase,
}

impl Context {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<Event>>,
	) -> Self {
		Self {
			mark_payment_as_processed_usecase:
				application::payment::mark_as_processed::Usecase::new(
					uuid_generator,
					event_publisher,
				),
		}
	}
}

impl juniper::Context for Context {}
