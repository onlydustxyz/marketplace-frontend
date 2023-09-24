use std::fmt::Debug;

use domain::{CommandId, Message};
use olog::opentelemetry::propagation::Extractor;
use serde::{Deserialize, Serialize};

use crate::amqp::UniqueMessage;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Decorator<P>(UniqueMessage<P>);

impl<P> Extractor for Decorator<P> {
	fn get(&self, key: &str) -> Option<&str> {
		self.0.get(key)
	}

	fn keys(&self) -> Vec<&str> {
		self.0.keys()
	}
}

impl<P: Message> Decorator<P> {
	pub fn new(command_id: CommandId, payload: P) -> Self {
		Self(UniqueMessage::new(payload).with_command(command_id))
	}

	pub fn command_id(&self) -> CommandId {
		self.0.command_id().unwrap()
	}

	pub fn inner(&self) -> &UniqueMessage<P> {
		&self.0
	}
}
