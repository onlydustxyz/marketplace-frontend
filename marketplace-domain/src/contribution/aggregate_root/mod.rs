use crate::*;
use crypto_bigint::U256;
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};
use std::{fmt::Display, str::FromStr};

mod event;
pub use event::Event;

mod status;
pub use status::Status;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct Id(HexPrefixedString);

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Aggregate {
	pub id: Id,
	pub project_id: GithubProjectId,
	pub issue_number: GithubIssueNumber,
	pub gate: u8,
	pub contributor_id: Option<ContributorId>,
	pub status: ContributionStatus,
}

impl AggregateRoot for Aggregate {
	type Event = Event;
	type Id = Id;
}

impl EventSourceable for Aggregate {
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
		let mut aggregate = Self::default();
		events.iter().for_each(|event| {
			aggregate.apply_event(event);
		});
		aggregate
	}
}

#[cfg(test)]
mod test {
	use super::*;
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
		let aggregate = Aggregate::from_events(vec![contribution_created_event]);
		assert_eq!(Status::Open, aggregate.status);
		assert_eq!(contribution_id, aggregate.id);
	}

	#[rstest]
	fn assign_contribution(contribution_created_event: Event, contribution_assigned_event: Event) {
		let aggregate = Aggregate::from_events(vec![
			contribution_created_event,
			contribution_assigned_event,
		]);
		assert_eq!(Status::Assigned, aggregate.status);
		assert!(aggregate.contributor_id.is_some());
	}

	#[rstest]
	fn unassign_contribution(
		contribution_created_event: Event,
		contribution_assigned_event: Event,
		contribution_unassigned_event: Event,
	) {
		let aggregate = Aggregate::from_events(vec![
			contribution_created_event,
			contribution_assigned_event,
			contribution_unassigned_event,
		]);
		assert_eq!(Status::Open, aggregate.status);
		assert!(aggregate.contributor_id.is_none());
	}

	#[rstest]
	fn validate_contribution(
		contribution_created_event: Event,
		contribution_assigned_event: Event,
		contribution_validated_event: Event,
	) {
		let aggregate = Aggregate::from_events(vec![
			contribution_created_event,
			contribution_assigned_event,
			contribution_validated_event,
		]);
		assert_eq!(Status::Completed, aggregate.status);
	}
}
