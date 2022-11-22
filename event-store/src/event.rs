use std::fmt::Display;

use backend_domain::{Event as DomainEvent, Message};
use chrono::{NaiveDateTime, Utc};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum Origin {
	Starknet,
	BACKEND,
}

impl Display for Origin {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			match self {
				Origin::Starknet => "starknet",
				Origin::BACKEND => "backend",
			}
		)
	}
}
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Event {
	pub event: DomainEvent,
	pub deduplication_id: String,
	pub timestamp: NaiveDateTime,
	pub metadata: Value,
	pub origin: Origin,
}

impl Message for Event {}

impl<E: Into<backend_domain::Event>> From<E> for Event {
	fn from(event: E) -> Self {
		Event {
			deduplication_id: Uuid::new_v4().to_string(),
			event: event.into(),
			timestamp: Utc::now().naive_utc(),
			origin: Origin::BACKEND,
			metadata: Default::default(),
		}
	}
}
