use std::fmt::Display;

use crate::{ContributionId, ContributorId};
use marketplace_wrappers::UuidWrapper;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Hash, UuidWrapper, Default)]
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

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct Projection {
	id: Id,
	contribution_id: ContributionId,
	contributor_id: ContributorId,
	status: Status,
}

impl crate::Projection for Projection {}

impl Projection {
	pub fn new(id: Id, contribution_id: ContributionId, contributor_id: ContributorId) -> Self {
		Self {
			id,
			contribution_id,
			contributor_id,
			status: Status::Pending,
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

	pub fn as_pending(&self) -> Self {
		Self {
			id: self.id,
			contribution_id: self.contribution_id.to_owned(),
			contributor_id: self.contributor_id.to_owned(),
			status: Status::Pending,
		}
	}

	pub fn as_accepted(&self) -> Self {
		Self {
			id: self.id,
			contribution_id: self.contribution_id.to_owned(),
			contributor_id: self.contributor_id.to_owned(),
			status: Status::Accepted,
		}
	}

	pub fn as_refused(&self) -> Self {
		Self {
			id: self.id,
			contribution_id: self.contribution_id.to_owned(),
			contributor_id: self.contributor_id.to_owned(),
			status: Status::Refused,
		}
	}
}

#[cfg(test)]
impl Projection {
	pub fn new_with_status(
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
}
