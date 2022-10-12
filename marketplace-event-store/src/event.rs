use chrono::NaiveDateTime;
use marketplace_domain::{Event as DomainEvent, EventOrigin, Message};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Event {
	pub event: DomainEvent,
	pub deduplication_id: String,
	pub timestamp: NaiveDateTime,
	pub metadata: Value,
	pub origin: EventOrigin,
}

impl Message for Event {}
