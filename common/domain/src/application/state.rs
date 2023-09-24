use serde::{Deserialize, Serialize};

use crate::{ApplicationEvent, ApplicationId, EventSourcable, UserId};

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct State {
	pub id: ApplicationId,
	pub applicant_id: UserId,
}

impl EventSourcable for State {
	type Event = ApplicationEvent;
	type Id = ApplicationId;

	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			ApplicationEvent::Received {
				id, applicant_id, ..
			} => Self {
				id: *id,
				applicant_id: *applicant_id,
			},
		}
	}
}
