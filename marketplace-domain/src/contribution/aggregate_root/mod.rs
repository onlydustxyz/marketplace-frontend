use crate::*;
use crypto_bigint::U256;
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};
use std::{fmt::Display, str::FromStr};
use thiserror::Error;

pub mod event;

mod status;
pub use status::Status;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct Id(HexPrefixedString);

#[derive(Debug, Error)]
pub enum Error {
	#[error(
		"The current contribution status, `{0}`, does not allow it to recieve new applications"
	)]
	CannotApply(ContributionStatus),
	#[error("Contributor `{0}` already applied")]
	AlreadyApplied(ContributorId),
}

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Contribution {
	id: Id,
	project_id: GithubProjectId,
	issue_number: GithubIssueNumber,
	gate: u8,
	contributor_id: Option<ContributorId>,
	status: ContributionStatus,
	applicants: Vec<ContributorId>,
}

impl Contribution {
	pub fn apply(self, contributor_id: &ContributorId) -> Result<Vec<Event>, Error> {
		if self.status != Status::Open {
			return Err(Error::CannotApply(self.status));
		}
		if self.applicants.contains(contributor_id) {
			return Err(Error::AlreadyApplied(contributor_id.clone()));
		}

		let applied_event = Event::Contribution(ContributionEvent::Applied {
			id: self.id,
			contributor_id: contributor_id.clone(),
		});

		Ok(vec![applied_event])
	}

	pub fn id(&self) -> &Id {
		&self.id
	}

	pub fn status(&self) -> &ContributionStatus {
		&self.status
	}
}

impl Aggregate for Contribution {
	type Id = Id;
}

impl EventSourcable for Contribution {
	fn apply_event(self, event: &Event) -> Self {
		match event {
			Event::Contribution(contribution_event) => match contribution_event {
				ContributionEvent::Created {
					id,
					project_id,
					issue_number,
					gate,
				} => Self {
					id: id.clone(),
					project_id: *project_id,
					issue_number: *issue_number,
					gate: *gate,
					status: Status::Open,
					..self
				},
				ContributionEvent::Applied {
					id: _,
					contributor_id,
				} => {
					let mut applicants = self.applicants;
					applicants.push(contributor_id.clone());
					Self { applicants, ..self }
				},
				ContributionEvent::Assigned {
					id: _,
					contributor_id,
				}
				| ContributionEvent::Claimed {
					id: _,
					contributor_id,
				} => Self {
					status: Status::Assigned,
					contributor_id: Some(contributor_id.clone()),
					..self
				},
				ContributionEvent::Unassigned { id: _ } => Self {
					status: Status::Open,
					contributor_id: None,
					..self
				},
				ContributionEvent::Validated { id: _ } => Self {
					status: Status::Completed,
					..self
				},
			},
			Event::Project(_) => self,
		}
	}
}

impl AggregateRoot for Contribution {}

#[cfg(test)]
mod tests;
