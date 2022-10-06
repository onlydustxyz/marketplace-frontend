use std::fmt::Display;

use crate::{Contribution, ContributionId, ContributorAccountAddress, Projection};
use chrono::NaiveDateTime;
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
pub struct Application {
	contribution_id: ContributionId,
	contributor_id: ContributorAccountAddress,
	applied_at: NaiveDateTime,
}

impl Projection for Application {
	type A = Contribution;
}

impl Application {
	pub fn new(
		contribution_id: ContributionId,
		contributor_id: ContributorAccountAddress,
		applied_at: NaiveDateTime,
	) -> Self {
		Self {
			contribution_id,
			contributor_id,
			applied_at,
		}
	}

	pub fn contribution_id(&self) -> &ContributionId {
		&self.contribution_id
	}

	pub fn contributor_id(&self) -> &ContributorAccountAddress {
		&self.contributor_id
	}

	pub fn applied_at(&self) -> &NaiveDateTime {
		&self.applied_at
	}
}

#[cfg(test)]
impl Application {
	pub fn new_with_status(
		contribution_id: ContributionId,
		contributor_id: ContributorAccountAddress,
		applied_at: NaiveDateTime,
	) -> Self {
		Self {
			contribution_id,
			contributor_id,
			applied_at,
		}
	}
}
