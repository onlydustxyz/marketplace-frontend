use marketplace_domain::{Publisher, UuidGenerator};
use marketplace_event_store::Event;
use std::sync::Arc;

pub struct Context {
	pub uuid_generator: Arc<dyn UuidGenerator>,
	pub event_publisher: Arc<dyn Publisher<Event>>,
}

impl Context {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<Event>>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
		}
	}
}

impl juniper::Context for Context {}
