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
	contributor_account_address: Option<ContributorAccountAddress>,
	status: ContributionStatus,
	closed: bool,
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
					contributor_account_address: Some(contributor_account_address.clone()),
					..self.without_applicant(contributor_account_address)
				},
				ContributionEvent::Unassigned { id: _ } => Self {
					status: Status::Open,
					contributor_account_address: None,
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
				ContributionEvent::Closed { .. } => Self {
					status: Status::Abandoned,
					closed: true,
					..self
				},
				ContributionEvent::Reopened { .. } => Self {
					status: Status::Open,
					closed: false,
					..self
				},
			},
			Event::Project(_) | Event::Contributor(_) => self,
		}
	}
}

impl AggregateRoot for Contribution {}

#[cfg(test)]
mod tests {
	use super::*;
	use assert_matches::assert_matches;
	use chrono::NaiveDate;
	use rstest::*;
	use std::str::FromStr;

	impl Contribution {
		pub fn new_with_id_and_status(id: Id, status: ContributionStatus) -> Self {
			Self {
				id,
				status,
				..Default::default()
			}
		}
	}

	#[fixture]
	fn contribution_id() -> Id {
		Id::from_str("0xfa").unwrap()
	}

	#[fixture]
	fn contributor_account_address() -> ContributorAccountAddress {
		ContributorAccountAddress::from_str("0x123").unwrap()
	}

	#[fixture]
	fn contribution_created_event(contribution_id: Id) -> Event {
		Event::Contribution(ContributionEvent::Created {
			id: contribution_id,
			project_id: Default::default(),
			issue_number: Default::default(),
			gate: Default::default(),
		})
	}

	#[fixture]
	fn contribution_assigned_event() -> Event {
		Event::Contribution(ContributionEvent::Assigned {
			id: Default::default(),
			contributor_account_address: Default::default(),
		})
	}

	#[fixture]
	fn contribution_applied_event(contributor_account_address: ContributorAccountAddress) -> Event {
		Event::Contribution(ContributionEvent::Applied {
			id: Default::default(),
			contributor_account_address,
			applied_at: NaiveDate::from_ymd(2022, 9, 16).and_hms(14, 37, 11),
		})
	}

	#[fixture]
	fn contribution_application_refused_event(
		contributor_account_address: ContributorAccountAddress,
	) -> Event {
		Event::Contribution(ContributionEvent::ApplicationRefused {
			id: Default::default(),
			contributor_account_address,
		})
	}

	#[fixture]
	fn contribution_claimed_event(contributor_account_address: ContributorAccountAddress) -> Event {
		Event::Contribution(ContributionEvent::Claimed {
			id: Default::default(),
			contributor_account_address,
		})
	}

	#[fixture]
	fn contribution_unassigned_event() -> Event {
		Event::Contribution(ContributionEvent::Unassigned {
			id: Default::default(),
		})
	}

	#[fixture]
	fn contribution_validated_event() -> Event {
		Event::Contribution(ContributionEvent::Validated {
			id: Default::default(),
		})
	}

	#[fixture]
	fn contribution_closed_event() -> Event {
		Event::Contribution(ContributionEvent::Closed {
			id: Default::default(),
		})
	}

	#[rstest]
	fn create_contribution(contribution_created_event: Event, contribution_id: Id) {
		let contribution = Contribution::from_events(&[contribution_created_event]);
		assert_eq!(Status::Open, contribution.status);
		assert_eq!(contribution_id, contribution.id);
		assert!(contribution.applicants.is_empty());
	}

	#[rstest]
	fn assign_contribution(contribution_created_event: Event, contribution_assigned_event: Event) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_assigned_event]);
		assert_eq!(Status::Assigned, contribution.status);
		assert!(contribution.contributor_account_address.is_some());
	}

	#[rstest]
	fn claim_contribution(contribution_created_event: Event, contribution_claimed_event: Event) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_claimed_event]);
		assert_eq!(Status::Assigned, contribution.status);
		assert!(contribution.contributor_account_address.is_some());
	}

	#[rstest]
	fn unassign_contribution(
		contribution_created_event: Event,
		contribution_assigned_event: Event,
		contribution_unassigned_event: Event,
	) {
		let contribution = Contribution::from_events(&[
			contribution_created_event,
			contribution_assigned_event,
			contribution_unassigned_event,
		]);
		assert_eq!(Status::Open, contribution.status);
		assert!(contribution.contributor_account_address.is_none());
	}

	#[rstest]
	fn validate_contribution(
		contribution_created_event: Event,
		contribution_assigned_event: Event,
		contribution_validated_event: Event,
	) {
		let contribution = Contribution::from_events(&[
			contribution_created_event,
			contribution_assigned_event,
			contribution_validated_event,
		]);
		assert_eq!(Status::Completed, contribution.status);
	}

	#[rstest]
	fn close_contribution(contribution_created_event: Event, contribution_closed_event: Event) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_closed_event]);
		assert_eq!(Status::Abandoned, contribution.status);
		assert!(contribution.closed);
	}

	#[rstest]
	fn apply_to_assigned_contribution(
		contribution_created_event: Event,
		contribution_assigned_event: Event,
	) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_assigned_event]);

		let result = contribution.apply(&ContributorAccountAddress::default());
		assert!(result.is_err());
		assert_matches!(result.unwrap_err(), Error::CannotApply(Status::Assigned))
	}

	#[rstest]
	fn apply_twice_to_contribution(
		contribution_created_event: Event,
		contribution_applied_event: Event,
		contributor_account_address: ContributorAccountAddress,
	) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_applied_event]);

		let second_application = contribution.apply(&contributor_account_address);
		assert!(second_application.is_err());
		assert_matches!(second_application.unwrap_err(), Error::AlreadyApplied(_))
	}

	#[rstest]
	fn apply_to_contribution_emits_an_event(contribution_created_event: Event) {
		let contribution = Contribution::from_events(&[contribution_created_event]);
		let contributor_account_address = ContributorAccountAddress::from_str("0x123").unwrap();

		let application_result = contribution.apply(&contributor_account_address);
		assert!(application_result.is_ok());

		let emitted_events = application_result.unwrap();
		assert_eq!(1, emitted_events.len());
		assert_matches!(
			emitted_events.first().unwrap(),
			Event::Contribution(ContributionEvent::Applied {
				contributor_account_address: _,
				id: _,
				applied_at: _
			})
		);
	}

	#[rstest]
	fn refuse_application_twice(
		contribution_created_event: Event,
		contribution_applied_event: Event,
		contribution_application_refused_event: Event,
		contributor_account_address: ContributorAccountAddress,
	) {
		let contribution = Contribution::from_events(&[
			contribution_created_event,
			contribution_applied_event,
			contribution_application_refused_event,
		]);

		let second_refusal = contribution.refuse_application(&contributor_account_address);
		assert!(second_refusal.is_err());
		assert_matches!(second_refusal.unwrap_err(), Error::NoPendingApplication(_))
	}

	#[rstest]
	fn refuse_application_emits_an_event(
		contribution_created_event: Event,
		contribution_applied_event: Event,
		contributor_account_address: ContributorAccountAddress,
	) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_applied_event]);

		let refusal_result = contribution.refuse_application(&contributor_account_address);
		assert!(refusal_result.is_ok());

		let emitted_events = refusal_result.unwrap();
		assert_eq!(1, emitted_events.len());
		assert_matches!(
			emitted_events.first().unwrap(),
			Event::Contribution(ContributionEvent::ApplicationRefused {
				contributor_account_address: _,
				id: _
			})
		);
	}
}
