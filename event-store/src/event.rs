use std::fmt::Display;

use backend_domain::{Event as DomainEvent, Message};
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use serde_json::Value;

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
