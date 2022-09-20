use crate::*;
use chrono::Utc;
use crypto_bigint::U256;
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};
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
	#[error("Contributor `{0}` dose not have any pending application")]
	NoPendingApplication(ContributorId),
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
			applied_at: Utc::now().naive_utc(),
		});

		Ok(vec![applied_event])
	}

	pub fn refuse_application(self, contributor_id: &ContributorId) -> Result<Vec<Event>, Error> {
		if !self.applicants.contains(contributor_id) {
			return Err(Error::NoPendingApplication(contributor_id.clone()));
		}

		let application_refused_event =
			Event::Contribution(ContributionEvent::ApplicationRefused {
				id: self.id,
				contributor_id: contributor_id.clone(),
			});

		Ok(vec![application_refused_event])
	}

	pub fn id(&self) -> &Id {
		&self.id
	}

	pub fn status(&self) -> &ContributionStatus {
		&self.status
	}

	fn with_applicant(self, contributor_id: &ContributorId) -> Self {
		let mut applicants = self.applicants;
		applicants.push(contributor_id.clone());
		Self { applicants, ..self }
	}

	fn without_applicant(self, contributor_id: &ContributorId) -> Self {
		let mut applicants = self.applicants;
		if let Some(index) =
			applicants.iter().rposition(|applicant_id| applicant_id == contributor_id)
		{
			applicants.remove(index);
		}
		Self { applicants, ..self }
	}
}

impl Aggregate for Contribution {
	type Event = ContributionEvent;
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
					applied_at: _,
				} => self.with_applicant(contributor_id),
				ContributionEvent::ApplicationRefused {
					id: _,
					contributor_id,
				} => self.without_applicant(contributor_id),
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
					..self.without_applicant(contributor_id)
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
				ContributionEvent::GateChanged { id: _, gate } => Self {
					gate: *gate,
					..self
				},
			},
			Event::Project(_) | Event::Contributor(_) => self,
		}
	}
}

impl AggregateRoot for Contribution {}

#[cfg(test)]
mod tests;
