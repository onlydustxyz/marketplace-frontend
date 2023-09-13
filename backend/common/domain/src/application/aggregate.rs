use chrono::Utc;
use derive_getters::Getters;
use serde::{Deserialize, Serialize};
use serde_with::serde_as;

use crate::{Aggregate, ApplicationEvent, ApplicationId, EventSourcable, ProjectId, UserId};

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Status {
	#[default]
	Active,
	Cancelled,
}

#[serde_as]
#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize, Getters)]
pub struct Application {
	id: ApplicationId,
	applicant_id: UserId,
}

impl Application {
	pub fn create(
		id: ApplicationId,
		project_id: ProjectId,
		applicant_id: UserId,
	) -> Vec<ApplicationEvent> {
		vec![ApplicationEvent::Received {
			id,
			project_id,
			applicant_id,
			received_at: Utc::now().naive_utc(),
		}]
	}
}

impl Aggregate for Application {
	type Event = ApplicationEvent;
	type Id = ApplicationId;
}

impl EventSourcable for Application {
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
