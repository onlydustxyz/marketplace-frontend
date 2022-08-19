use std::fmt::Display;

use super::{ContributionId, ContributorId};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use wrappers::UuidWrapper;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Hash, UuidWrapper)]
pub struct Id(Uuid);

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
pub enum Status {
	#[default]
	Pending,
	Accepted,
	Refused,
}

impl Display for Status {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			match self {
				Status::Pending => "pending",
				Status::Accepted => "accepted",
				Status::Refused => "refused",
			}
		)
	}
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Application {
	id: Id,
	contribution_id: ContributionId,
	contributor_id: ContributorId,
	status: Status,
}

impl Application {
	pub fn new(
		id: Id,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
		status: Status,
	) -> Self {
		Self {
			id,
			contribution_id,
			contributor_id,
			status,
		}
	}

	pub fn id(&self) -> &Id {
		&self.id
	}

	pub fn contribution_id(&self) -> &ContributionId {
		&self.contribution_id
	}

	pub fn contributor_id(&self) -> &ContributorId {
		&self.contributor_id
	}

	pub fn status(&self) -> &Status {
		&self.status
	}
}
