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

impl crate::Entity for Entity {
	type Id = CommandId;
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct Metadata {
	aggregates: HashSet<Aggregate>,
}

impl Metadata {
	pub fn add_aggregate(&mut self, aggregate_metadata: Aggregate) {
		self.aggregates.insert(aggregate_metadata);
	}
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum Aggregate {
	Project(ProjectId),
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct CommandEvent {
	pub command_id: CommandId,
	pub aggregate: Aggregate,
}

pub trait IntoCommandEvent {
	fn into(&self) -> CommandEvent;
}
