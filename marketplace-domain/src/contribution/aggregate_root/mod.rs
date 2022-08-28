use crate::*;
use crypto_bigint::U256;
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};
use std::{fmt::Display, str::FromStr};
use thiserror::Error;

mod event;
pub use event::Event;

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
	pub id: Id,
	pub project_id: GithubProjectId,
	pub issue_number: GithubIssueNumber,
	pub gate: u8,
	pub contributor_id: Option<ContributorId>,
	pub status: ContributionStatus,
	pub applicants: Vec<ContributorId>,
	pub pending_events: Vec<Event>,
}

impl Contribution {
	pub fn apply(&mut self, contributor_id: &ContributorId) -> Result<(), Error> {
		if self.status != Status::Open {
			return Err(Error::CannotApply(self.status.to_owned()));
		}
		if self.applicants.contains(&contributor_id) {
			return Err(Error::AlreadyApplied(contributor_id.to_owned()));
		}

		let applied_event = Event::Applied {
			id: self.id.to_owned(),
			contributor_id: contributor_id.to_owned(),
		};

		self.emit(applied_event.to_owned());
		self.apply_event(&applied_event);
		Ok(())
	}
}

impl Aggregate for Contribution {
	type Event = Event;
	type Id = Id;

	fn apply_event(&mut self, event: &Self::Event) {
		match event.clone() {
			Event::Created {
				id,
				project_id,
				issue_number,
				gate,
			} => {
				self.id = id;
				self.project_id = project_id;
				self.issue_number = issue_number;
				self.gate = gate;
				self.status = Status::Open;
			},
			Event::Applied {
				id: _,
				contributor_id,
			} => {
				self.applicants.push(contributor_id.to_owned());
			},
			Event::Assigned {
				id: _,
				contributor_id,
			} => {
				self.status = Status::Assigned;
				self.contributor_id = Some(contributor_id);
			},
			Event::Unassigned { id: _ } => {
				self.status = Status::Open;
				self.contributor_id = None;
			},
			Event::Validated { id: _ } => {
				self.status = Status::Completed;
			},
		}
	}

	fn from_events(events: Vec<Self::Event>) -> Self {
		let mut contribution = Self::default();
		events.iter().for_each(|event| {
			contribution.apply_event(event);
		});
		contribution
	}

	fn emit(&mut self, event: Self::Event) {
		self.pending_events.push(event);
	}
}

impl AggregateRoot for Contribution {}

#[cfg(test)]
mod test {
	use super::*;
	use assert_matches::assert_matches;
	use rstest::*;

	#[fixture]
	fn contribution_id() -> Id {
		Id::from_str("0xfa").unwrap()
	}

	#[fixture]
	fn contribution_created_event(contribution_id: Id) -> Event {
		Event::Created {
			id: contribution_id,
			project_id: Default::default(),
			issue_number: Default::default(),
			gate: Default::default(),
		}
	}

	#[fixture]
	fn contribution_assigned_event() -> Event {
		Event::Assigned {
			id: Default::default(),
			contributor_id: Default::default(),
		}
	}

	#[fixture]
	fn contribution_unassigned_event() -> Event {
		Event::Unassigned {
			id: Default::default(),
		}
	}

	#[fixture]
	fn contribution_validated_event() -> Event {
		Event::Validated {
			id: Default::default(),
		}
	}

	#[rstest]
	fn create_contribution(contribution_created_event: Event, contribution_id: Id) {
		let contribution = Contribution::from_events(vec![contribution_created_event]);
		assert_eq!(Status::Open, contribution.status);
		assert_eq!(contribution_id, contribution.id);
		assert!(contribution.applicants.is_empty());
	}

	#[rstest]
	fn assign_contribution(contribution_created_event: Event, contribution_assigned_event: Event) {
		let contribution = Contribution::from_events(vec![
			contribution_created_event,
			contribution_assigned_event,
		]);
		assert_eq!(Status::Assigned, contribution.status);
		assert!(contribution.contributor_id.is_some());
	}

	#[rstest]
	fn unassign_contribution(
		contribution_created_event: Event,
		contribution_assigned_event: Event,
		contribution_unassigned_event: Event,
	) {
		let contribution = Contribution::from_events(vec![
			contribution_created_event,
			contribution_assigned_event,
			contribution_unassigned_event,
		]);
		assert_eq!(Status::Open, contribution.status);
		assert!(contribution.contributor_id.is_none());
	}

	#[rstest]
	fn validate_contribution(
		contribution_created_event: Event,
		contribution_assigned_event: Event,
		contribution_validated_event: Event,
	) {
		let contribution = Contribution::from_events(vec![
			contribution_created_event,
			contribution_assigned_event,
			contribution_validated_event,
		]);
		assert_eq!(Status::Completed, contribution.status);
	}

	#[rstest]
	fn apply_to_assigned_contribution(
		contribution_created_event: Event,
		contribution_assigned_event: Event,
	) {
		let mut contribution = Contribution::from_events(vec![
			contribution_created_event,
			contribution_assigned_event,
		]);

		let result = contribution.apply(&ContributorId::default());
		assert!(result.is_err());
		assert_matches!(result.unwrap_err(), Error::CannotApply(Status::Assigned))
	}

	#[rstest]
	fn apply_twice_to_contribution(contribution_created_event: Event) {
		let mut contribution = Contribution::from_events(vec![contribution_created_event]);
		let contributor_id = ContributorId::from_str("0x123").unwrap();

		let _first_application = contribution.apply(&contributor_id);
		let second_application = contribution.apply(&contributor_id);
		assert!(second_application.is_err());
		assert_matches!(second_application.unwrap_err(), Error::AlreadyApplied(_))
	}
	#[rstest]
	fn apply_to_contribution_emits_an_event(contribution_created_event: Event) {
		let mut contribution = Contribution::from_events(vec![contribution_created_event]);
		let contributor_id = ContributorId::from_str("0x123").unwrap();

		let application_result = contribution.apply(&contributor_id);
		assert!(application_result.is_ok());

		assert_eq!(1, contribution.pending_events.len());
		assert_matches!(
			contribution.pending_events.first().unwrap(),
			ContributionEvent::Applied {
				contributor_id: _,
				id: _
			}
		);
	}
}
