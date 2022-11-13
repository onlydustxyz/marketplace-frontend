use crate::*;
use chrono::Utc;
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};
use thiserror::Error;
use uuid::Uuid;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct Id(HexPrefixedString);

#[derive(Debug, Error)]
pub enum Error {
	#[error(
		"The current contribution status, `{0}`, does not allow it to recieve new applications"
	)]
	CannotApply(ContributionStatus),
	#[error("Contributor `{0}` already applied")]
	AlreadyApplied(Uuid),
	#[error("Contributor `{0}` dose not have any pending application")]
	NoPendingApplication(Uuid),
}

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Contribution {
	id: Id,
	project_id: GithubProjectId,
	issue_number: GithubIssueNumber,
	gate: u8,
	contributor_id: Option<Uuid>,
	status: ContributionStatus,
	closed: bool,
	applicants: Vec<Uuid>,
}

impl Contribution {
	pub fn apply(self, contributor_id: Uuid) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		if self.status != ContributionStatus::Open {
			return Err(Error::CannotApply(self.status));
		}
		if self.applicants.contains(&contributor_id) {
			return Err(Error::AlreadyApplied(contributor_id));
		}

		let applied_event = ContributionEvent::Applied {
			id: self.id,
			contributor_id,
			applied_at: Utc::now().naive_utc(),
		};

		Ok(vec![applied_event])
	}

	pub fn refuse_application(
		self,
		contributor_id: Uuid,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		if !self.applicants.contains(&contributor_id) {
			return Err(Error::NoPendingApplication(contributor_id));
		}

		let application_refused_event = ContributionEvent::ApplicationRefused {
			id: self.id,
			contributor_id,
		};

		Ok(vec![application_refused_event])
	}

	pub fn id(&self) -> &Id {
		&self.id
	}

	pub fn status(&self) -> &ContributionStatus {
		&self.status
	}

	fn with_applicant(self, contributor_id: Uuid) -> Self {
		let mut applicants = self.applicants;
		applicants.push(contributor_id);
		Self { applicants, ..self }
	}

	fn without_applicant(self, contributor_id: Uuid) -> Self {
		let mut applicants = self.applicants;
		if let Some(index) =
			applicants.iter().rposition(|applicant_id| applicant_id == &contributor_id)
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
	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
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
				status: ContributionStatus::Open,
				..self
			},
			ContributionEvent::Applied {
				id: _,
				contributor_id,
				applied_at: _,
			} => self.with_applicant(*contributor_id),
			ContributionEvent::ApplicationRefused {
				id: _,
				contributor_id,
			} => self.without_applicant(*contributor_id),
			ContributionEvent::Assigned {
				id: _,
				contributor_id,
			}
			| ContributionEvent::Claimed {
				id: _,
				contributor_id,
			} => Self {
				status: ContributionStatus::Assigned,
				contributor_id: Some(*contributor_id),
				..self.without_applicant(*contributor_id)
			},
			ContributionEvent::Unassigned { id: _ } => Self {
				status: ContributionStatus::Open,
				contributor_id: None,
				..self
			},
			ContributionEvent::Validated { id: _ } => Self {
				status: ContributionStatus::Completed,
				..self
			},
			ContributionEvent::GateChanged { id: _, gate } => Self {
				gate: *gate,
				..self
			},
			ContributionEvent::Closed { .. } => Self {
				status: ContributionStatus::Abandoned,
				closed: true,
				..self
			},
			ContributionEvent::Reopened { .. } => Self {
				status: ContributionStatus::Open,
				closed: false,
				..self
			},
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
	fn contributor_id() -> Uuid {
		Uuid::from_str("3d863031-e9bb-42dc-becd-67999675fb8b").unwrap()
	}

	#[fixture]
	fn contribution_created_event(contribution_id: Id) -> ContributionEvent {
		ContributionEvent::Created {
			id: contribution_id,
			project_id: Default::default(),
			issue_number: Default::default(),
			gate: Default::default(),
		}
	}

	#[fixture]
	fn contribution_assigned_event() -> ContributionEvent {
		ContributionEvent::Assigned {
			id: Default::default(),
			contributor_id: Default::default(),
		}
	}

	#[fixture]
	fn contribution_applied_event(contributor_id: Uuid) -> ContributionEvent {
		ContributionEvent::Applied {
			id: Default::default(),
			contributor_id,
			applied_at: NaiveDate::from_ymd(2022, 9, 16).and_hms(14, 37, 11),
		}
	}

	#[fixture]
	fn contribution_application_refused_event(contributor_id: Uuid) -> ContributionEvent {
		ContributionEvent::ApplicationRefused {
			id: Default::default(),
			contributor_id,
		}
	}

	#[fixture]
	fn contribution_claimed_event(contributor_id: Uuid) -> ContributionEvent {
		ContributionEvent::Claimed {
			id: Default::default(),
			contributor_id,
		}
	}

	#[fixture]
	fn contribution_unassigned_event() -> ContributionEvent {
		ContributionEvent::Unassigned {
			id: Default::default(),
		}
	}

	#[fixture]
	fn contribution_validated_event() -> ContributionEvent {
		ContributionEvent::Validated {
			id: Default::default(),
		}
	}

	#[fixture]
	fn contribution_closed_event() -> ContributionEvent {
		ContributionEvent::Closed {
			id: Default::default(),
		}
	}

	#[rstest]
	fn create_contribution(contribution_created_event: ContributionEvent, contribution_id: Id) {
		let contribution = Contribution::from_events(&[contribution_created_event]);
		assert_eq!(ContributionStatus::Open, contribution.status);
		assert_eq!(contribution_id, contribution.id);
		assert!(contribution.applicants.is_empty());
	}

	#[rstest]
	fn assign_contribution(
		contribution_created_event: ContributionEvent,
		contribution_assigned_event: ContributionEvent,
	) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_assigned_event]);
		assert_eq!(ContributionStatus::Assigned, contribution.status);
		assert!(contribution.contributor_id.is_some());
	}

	#[rstest]
	fn claim_contribution(
		contribution_created_event: ContributionEvent,
		contribution_claimed_event: ContributionEvent,
	) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_claimed_event]);
		assert_eq!(ContributionStatus::Assigned, contribution.status);
		assert!(contribution.contributor_id.is_some());
	}

	#[rstest]
	fn unassign_contribution(
		contribution_created_event: ContributionEvent,
		contribution_assigned_event: ContributionEvent,
		contribution_unassigned_event: ContributionEvent,
	) {
		let contribution = Contribution::from_events(&[
			contribution_created_event,
			contribution_assigned_event,
			contribution_unassigned_event,
		]);
		assert_eq!(ContributionStatus::Open, contribution.status);
		assert!(contribution.contributor_id.is_none());
	}

	#[rstest]
	fn validate_contribution(
		contribution_created_event: ContributionEvent,
		contribution_assigned_event: ContributionEvent,
		contribution_validated_event: ContributionEvent,
	) {
		let contribution = Contribution::from_events(&[
			contribution_created_event,
			contribution_assigned_event,
			contribution_validated_event,
		]);
		assert_eq!(ContributionStatus::Completed, contribution.status);
	}

	#[rstest]
	fn close_contribution(
		contribution_created_event: ContributionEvent,
		contribution_closed_event: ContributionEvent,
	) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_closed_event]);
		assert_eq!(ContributionStatus::Abandoned, contribution.status);
		assert!(contribution.closed);
	}

	#[rstest]
	fn apply_to_assigned_contribution(
		contribution_created_event: ContributionEvent,
		contribution_assigned_event: ContributionEvent,
		contributor_id: Uuid,
	) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_assigned_event]);

		let result = contribution.apply(contributor_id);
		assert!(result.is_err());
		assert_matches!(
			result.unwrap_err(),
			Error::CannotApply(ContributionStatus::Assigned)
		)
	}

	#[rstest]
	fn apply_twice_to_contribution(
		contribution_created_event: ContributionEvent,
		contribution_applied_event: ContributionEvent,
		contributor_id: Uuid,
	) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_applied_event]);

		let second_application = contribution.apply(contributor_id);
		assert!(second_application.is_err());
		assert_matches!(second_application.unwrap_err(), Error::AlreadyApplied(_))
	}

	#[rstest]
	fn apply_to_contribution_emits_an_event(contribution_created_event: ContributionEvent) {
		let contribution = Contribution::from_events(&[contribution_created_event]);
		let contributor_id = Uuid::from_str("acf8049e-59c8-421b-9afa-6fa4e855ea0a").unwrap();

		let application_result = contribution.apply(contributor_id);
		assert!(application_result.is_ok());

		let emitted_events = application_result.unwrap();
		assert_eq!(1, emitted_events.len());
		assert_matches!(
			emitted_events.first().unwrap(),
			ContributionEvent::Applied {
				contributor_id: _,
				id: _,
				applied_at: _
			}
		);
	}

	#[rstest]
	fn refuse_application_twice(
		contribution_created_event: ContributionEvent,
		contribution_applied_event: ContributionEvent,
		contribution_application_refused_event: ContributionEvent,
		contributor_id: Uuid,
	) {
		let contribution = Contribution::from_events(&[
			contribution_created_event,
			contribution_applied_event,
			contribution_application_refused_event,
		]);

		let second_refusal = contribution.refuse_application(contributor_id);
		assert!(second_refusal.is_err());
		assert_matches!(second_refusal.unwrap_err(), Error::NoPendingApplication(_))
	}

	#[rstest]
	fn refuse_application_emits_an_event(
		contribution_created_event: ContributionEvent,
		contribution_applied_event: ContributionEvent,
		contributor_id: Uuid,
	) {
		let contribution =
			Contribution::from_events(&[contribution_created_event, contribution_applied_event]);

		let refusal_result = contribution.refuse_application(contributor_id);
		assert!(refusal_result.is_ok());

		let emitted_events = refusal_result.unwrap();
		assert_eq!(1, emitted_events.len());
		assert_matches!(
			emitted_events.first().unwrap(),
			ContributionEvent::ApplicationRefused {
				contributor_id: _,
				id: _
			}
		);
	}
}
