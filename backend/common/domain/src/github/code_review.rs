use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use super::User;

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct CodeReview {
	pub reviewer: User,
	pub status: Status,
	pub outcome: Option<Outcome>,
	pub submitted_at: Option<DateTime<Utc>>,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub enum Status {
	Pending,
	Completed,
}

#[derive(Clone, Debug, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub enum Outcome {
	ChangeRequested,
	Approved,
}
