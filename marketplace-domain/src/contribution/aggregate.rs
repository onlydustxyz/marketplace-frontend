use futures::future::BoxFuture;
use thiserror::Error;

#[derive(Debug, Error, PartialEq, Eq)]
pub enum Error {
	#[error("Invalid state transition")]
	InvalidStateTransition,
}

use super::*;
use marketplace_wrappers::UuidWrapper;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(
	Debug,
	Clone,
	Copy,
	PartialEq,
	Eq,
	Hash,
	Serialize,
	Deserialize,
	JsonSchema,
	UuidWrapper,
	Default,
)]
pub struct Id(Uuid);

pub struct Aggregate;

impl eventually::Aggregate for Aggregate {
	type Command = ();
	type Event = Event;
	type Error = Error;
	type Id = Id;
	type State = State;

	fn apply(state: Self::State, event: Self::Event) -> Result<Self::State, Self::Error> {
		match event {
			Event::Created { project_id, gate } if state.status == Status::None => {
				Ok(Self::State {
					project_id,
					gate,
					status: Status::Open,
					..state
				})
			},
			Event::Assigned { contributor_id } if state.status == Status::Open => Ok(Self::State {
				status: Status::Assigned,
				contributor_id: Some(contributor_id),
				..state
			}),
			Event::Unassigned if state.status == Status::Assigned => Ok(Self::State {
				status: Status::Open,
				contributor_id: None,
				..state
			}),
			Event::Validated if state.status == Status::Assigned => Ok(Self::State {
				status: Status::Completed,
				..state
			}),
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
		unimplemented!()
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[fixture]
	fn no_contribution() -> State {
		State::default()
	}

	#[fixture]
	fn open_contribution() -> State {
		State {
			status: Status::Open,
			..Default::default()
		}
	}

	#[fixture]
	fn assigned_contribution() -> State {
		State {
			status: Status::Assigned,
			contributor_id: Some(Default::default()),
			..Default::default()
		}
	}

	#[fixture]
	fn completed_contribution() -> State {
		State {
			status: Status::Completed,
			contributor_id: Some(Default::default()),
			..Default::default()
		}
	}

	#[fixture]
	fn contribution_created_event() -> Event {
		Event::Created {
			project_id: Default::default(),
			gate: Default::default(),
		}
	}

	#[fixture]
	fn contribution_assigned_event() -> Event {
		Event::Assigned {
			contributor_id: Default::default(),
		}
	}

	#[fixture]
	fn contribution_unassigned_event() -> Event {
		Event::Unassigned
	}

	#[fixture]
	fn contribution_validated_event() -> Event {
		Event::Validated
	}

	fn apply(state: State, event: Event) -> Result<State, Error> {
		<Aggregate as eventually::Aggregate>::apply(state, event)
	}

	#[rstest]
	fn create_contribution(no_contribution: State, contribution_created_event: Event) {
		let state = apply(no_contribution, contribution_created_event).unwrap();
		assert_eq!(Status::Open, state.status);
	}

	#[rstest]
	fn assign_contribution(open_contribution: State, contribution_assigned_event: Event) {
		let state = apply(open_contribution, contribution_assigned_event).unwrap();
		assert_eq!(Status::Assigned, state.status);
		assert!(state.contributor_id.is_some());
	}

	#[rstest]
	fn unassign_contribution(assigned_contribution: State, contribution_unassigned_event: Event) {
		let state = apply(assigned_contribution, contribution_unassigned_event).unwrap();
		assert_eq!(Status::Open, state.status);
		assert!(state.contributor_id.is_none());
	}

	#[rstest]
	fn validate_contribution(assigned_contribution: State, contribution_validated_event: Event) {
		let state = apply(assigned_contribution, contribution_validated_event).unwrap();
		assert_eq!(Status::Completed, state.status);
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
	fn invalid_transition(#[case] state: State, #[case] event: Event) {
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
	#[should_panic(expected = "not implemented")]
	async fn no_command_handled(#[case] state: State) {
		let aggregate = Aggregate;
		let _ = eventually::Aggregate::handle(&aggregate, &Default::default(), &state, ()).await;
	}
}
