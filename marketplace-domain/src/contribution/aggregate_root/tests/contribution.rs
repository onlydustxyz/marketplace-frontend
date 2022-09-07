use super::super::*;
use assert_matches::assert_matches;
use rstest::*;

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
fn contributor_id() -> ContributorId {
	ContributorId::from_str("0x123").unwrap()
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
fn contribution_applied_event(contributor_id: ContributorId) -> Event {
	Event::Applied {
		id: Default::default(),
		contributor_id,
	}
}

#[fixture]
fn contribution_claimed_event(contributor_id: ContributorId) -> Event {
	Event::Claimed {
		id: Default::default(),
		contributor_id,
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
	let contribution = Contribution::from_events(&vec![contribution_created_event]);
	assert_eq!(Status::Open, contribution.status);
	assert_eq!(contribution_id, contribution.id);
	assert!(contribution.applicants.is_empty());
}

#[rstest]
fn assign_contribution(contribution_created_event: Event, contribution_assigned_event: Event) {
	let contribution = Contribution::from_events(&vec![
		contribution_created_event,
		contribution_assigned_event,
	]);
	assert_eq!(Status::Assigned, contribution.status);
	assert!(contribution.contributor_id.is_some());
}

#[rstest]
fn claim_contribution(contribution_created_event: Event, contribution_claimed_event: Event) {
	let contribution = Contribution::from_events(&vec![
		contribution_created_event,
		contribution_claimed_event,
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
	let contribution = Contribution::from_events(&vec![
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
	let contribution = Contribution::from_events(&vec![
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
	let contribution = Contribution::from_events(&vec![
		contribution_created_event,
		contribution_assigned_event,
	]);

	let result = contribution.apply(&ContributorId::default());
	assert!(result.is_err());
	assert_matches!(result.unwrap_err(), Error::CannotApply(Status::Assigned))
}

#[rstest]
fn apply_twice_to_contribution(
	contribution_created_event: Event,
	contribution_applied_event: Event,
	contributor_id: ContributorId,
) {
	let contribution = Contribution::from_events(&vec![
		contribution_created_event,
		contribution_applied_event,
	]);

	let second_application = contribution.apply(&contributor_id);
	assert!(second_application.is_err());
	assert_matches!(second_application.unwrap_err(), Error::AlreadyApplied(_))
}

#[rstest]
fn apply_to_contribution_emits_an_event(contribution_created_event: Event) {
	let contribution = Contribution::from_events(&vec![contribution_created_event]);
	let contributor_id = ContributorId::from_str("0x123").unwrap();

	let application_result = contribution.apply(&contributor_id);
	assert!(application_result.is_ok());

	let emitted_events = application_result.unwrap();
	assert_eq!(1, emitted_events.len());
	assert_matches!(
		emitted_events.first().unwrap(),
		ContributionEvent::Applied {
			contributor_id: _,
			id: _
		}
	);
}
