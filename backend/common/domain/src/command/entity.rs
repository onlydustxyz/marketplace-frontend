use std::collections::HashSet;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use crate::*;

#[derive(Default, Debug, Clone, Serialize, Deserialize)]
pub struct Entity {
	pub id: CommandId,
	pub processing_count: i32,
	pub created_at: DateTime<Utc>,
	pub updated_at: Option<DateTime<Utc>>,
	pub metadata: Metadata,
}

impl Entity {
	pub fn new(id: CommandId) -> Self {
		Self {
			id,
			created_at: Utc::now(),
			..Default::default()
		}
	}
}

impl crate::Entity for Entity {
	type Id = CommandId;
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct Metadata {
	aggregates: HashSet<AggregateId>,
}

impl Metadata {
	pub fn add_aggregate(&mut self, aggregate_metadata: AggregateId) {
		self.aggregates.insert(aggregate_metadata);
	}
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum AggregateId {
	Project(ProjectId),
}

impl From<Event> for AggregateId {
	fn from(event: Event) -> Self {
		match event {
			Event::Project(e) => Self::Project(*e.aggregate_id()),
		}
	}
}
