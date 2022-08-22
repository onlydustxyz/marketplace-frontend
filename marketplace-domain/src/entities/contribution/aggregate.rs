use crate::*;
use eventually::Aggregate;
use futures::{future::BoxFuture, FutureExt};
use thiserror::Error;

#[derive(Debug, Error, PartialEq, Eq)]
pub enum Error {
	#[error("Invalid state transition")]
	InvalidStateTransition,
}

impl Aggregate for Contribution {
	type Command = ();
	type Event = ContributionEvent;
	type Error = Error;
	type Id = ContributionId;
	type State = Self;

	fn apply(state: Self::State, event: Self::Event) -> Result<Self::State, Self::Error> {
		match event {
			ContributionEvent::Created {
				id,
				project_id,
				gate,
			} if state.status == ContributionStatus::None => Ok(Self::State {
				id,
				project_id,
				gate,
				status: ContributionStatus::Open,
				..state
			}),
			ContributionEvent::Assigned {
				id: _,
				contributor_id,
			} if state.status == ContributionStatus::Open => Ok(Self::State {
				status: ContributionStatus::Assigned,
				contributor_id: Some(contributor_id),
				..state
			}),
			ContributionEvent::Unassigned { id: _ }
				if state.status == ContributionStatus::Assigned =>
			{
				Ok(Self::State {
					status: ContributionStatus::Open,
					contributor_id: None,
					..state
				})
			},
			ContributionEvent::Validated { id: _ }
				if state.status == ContributionStatus::Assigned =>
			{
				Ok(Self::State {
					status: ContributionStatus::Completed,
					..state
				})
			},
			_ => Err(Self::Error::InvalidStateTransition),
		}
	}

	fn handle<'a, 's: 'a>(
		&'a self,
		_id: &'s Self::Id,
		_state: &'s Self::State,
		_command: Self::Command,
	) -> BoxFuture<'a, Result<Option<Vec<Self::Event>>, Self::Error>>
	where
		Self: Sized,
	{
		async { Ok(None) }.boxed()
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[fixture]
	fn no_contribution() -> Contribution {
		Contribution::default()
	}

	#[fixture]
	fn open_contribution() -> Contribution {
		Contribution {
			status: ContributionStatus::Open,
			..Default::default()
		}
	}

	#[fixture]
	fn assigned_contribution() -> Contribution {
		Contribution {
			status: ContributionStatus::Assigned,
			contributor_id: Some(Default::default()),
			..Default::default()
		}
	}

	#[fixture]
	fn completed_contribution() -> Contribution {
		Contribution {
			status: ContributionStatus::Completed,
			contributor_id: Some(Default::default()),
			..Default::default()
		}
	}

	#[fixture]
	fn contribution_created_event() -> ContributionEvent {
		ContributionEvent::Created {
			id: Default::default(),
			project_id: Default::default(),
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

	fn apply(state: Contribution, event: ContributionEvent) -> Result<Contribution, Error> {
		<Contribution as Aggregate>::apply(state, event)
	}

	#[rstest]
	fn create_contribution(
		no_contribution: Contribution,
		contribution_created_event: ContributionEvent,
	) {
		let state = apply(no_contribution, contribution_created_event).unwrap();
		assert_eq!(ContributionStatus::Open, state.status);
	}

	#[rstest]
	fn assign_contribution(
		open_contribution: Contribution,
		contribution_assigned_event: ContributionEvent,
	) {
		let state = apply(open_contribution, contribution_assigned_event).unwrap();
		assert_eq!(ContributionStatus::Assigned, state.status);
		assert!(state.contributor_id.is_some());
	}

	#[rstest]
	fn unassign_contribution(
		assigned_contribution: Contribution,
		contribution_unassigned_event: ContributionEvent,
	) {
		let state = apply(assigned_contribution, contribution_unassigned_event).unwrap();
		assert_eq!(ContributionStatus::Open, state.status);
		assert!(state.contributor_id.is_none());
	}

	#[rstest]
	fn validate_contribution(
		assigned_contribution: Contribution,
		contribution_validated_event: ContributionEvent,
	) {
		let state = apply(assigned_contribution, contribution_validated_event).unwrap();
		assert_eq!(ContributionStatus::Completed, state.status);
	}

	#[rstest]
	#[case(no_contribution(), contribution_assigned_event())]
	#[case(no_contribution(), contribution_unassigned_event())]
	#[case(no_contribution(), contribution_validated_event())]
	#[case(open_contribution(), contribution_created_event())]
	#[case(open_contribution(), contribution_unassigned_event())]
	#[case(open_contribution(), contribution_validated_event())]
	#[case(assigned_contribution(), contribution_created_event())]
	#[case(assigned_contribution(), contribution_assigned_event())]
	#[case(completed_contribution(), contribution_created_event())]
	#[case(completed_contribution(), contribution_assigned_event())]
	#[case(completed_contribution(), contribution_unassigned_event())]
	#[case(completed_contribution(), contribution_validated_event())]
	fn invalid_transition(#[case] state: Contribution, #[case] event: ContributionEvent) {
		assert_eq!(
			Error::InvalidStateTransition,
			apply(state, event).unwrap_err()
		);
	}

	#[rstest]
	#[case(no_contribution())]
	#[case(open_contribution())]
	#[case(assigned_contribution())]
	#[case(completed_contribution())]
	async fn no_command_handled(#[case] state: Contribution) {
		let aggregate = Contribution::default();
		let result = aggregate.handle(&Default::default(), &state, ()).await;
		assert_eq!(None, result.unwrap());
	}
}
