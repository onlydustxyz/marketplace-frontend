use crate::*;
use chrono::Utc;
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
	AlreadyApplied(ContributorAccountAddress),
	#[error("Contributor `{0}` dose not have any pending application")]
	NoPendingApplication(ContributorAccountAddress),
}

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Contribution {
	id: Id,
	project_id: GithubProjectId,
	issue_number: GithubIssueNumber,
	gate: u8,
	contributor_id: Option<ContributorAccountAddress>,
	status: ContributionStatus,
	applicants: Vec<ContributorAccountAddress>,
}

impl Contribution {
	pub fn apply(
		self,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<Vec<Event>, Error> {
		if self.status != Status::Open {
			return Err(Error::CannotApply(self.status));
		}
		if self.applicants.contains(contributor_account_address) {
			return Err(Error::AlreadyApplied(contributor_account_address.clone()));
		}

		let applied_event = Event::Contribution(ContributionEvent::Applied {
			id: self.id,
			contributor_account_address: contributor_account_address.clone(),
			applied_at: Utc::now().naive_utc(),
		});

		Ok(vec![applied_event])
	}

	pub fn refuse_application(
		self,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<Vec<Event>, Error> {
		if !self.applicants.contains(contributor_account_address) {
			return Err(Error::NoPendingApplication(
				contributor_account_address.clone(),
			));
		}

		let application_refused_event =
			Event::Contribution(ContributionEvent::ApplicationRefused {
				id: self.id,
				contributor_account_address: contributor_account_address.clone(),
			});

		Ok(vec![application_refused_event])
	}

	pub fn id(&self) -> &Id {
		&self.id
	}

	pub fn status(&self) -> &ContributionStatus {
		&self.status
	}

	fn with_applicant(self, contributor_account_address: &ContributorAccountAddress) -> Self {
		let mut applicants = self.applicants;
		applicants.push(contributor_account_address.clone());
		Self { applicants, ..self }
	}

	fn without_applicant(self, contributor_account_address: &ContributorAccountAddress) -> Self {
		let mut applicants = self.applicants;
		if let Some(index) = applicants
			.iter()
			.rposition(|applicant_id| applicant_id == contributor_account_address)
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
				ContributionEvent::Deployed { contract_address } => Self {
					id: contract_address.clone().into(),
					..self
				},
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
					contributor_account_address,
					applied_at: _,
				} => self.with_applicant(contributor_account_address),
				ContributionEvent::ApplicationRefused {
					id: _,
					contributor_account_address,
				} => self.without_applicant(contributor_account_address),
				ContributionEvent::Assigned {
					id: _,
					contributor_account_address,
				}
				| ContributionEvent::Claimed {
					id: _,
					contributor_account_address,
				} => Self {
					status: Status::Assigned,
					contributor_id: Some(contributor_account_address.clone()),
					..self.without_applicant(contributor_account_address)
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
				ContributionEvent::Deleted { .. } => Self {
					status: Status::Abandoned,
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
