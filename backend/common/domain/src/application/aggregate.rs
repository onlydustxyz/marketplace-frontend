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
	pending_events: Vec<ApplicationEvent>,
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

	fn pending_events(&mut self) -> &mut Vec<Self::Event> {
		&mut self.pending_events
	}
}

impl EventSourcable for Application {
	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			ApplicationEvent::Received {
				id, applicant_id, ..
			} => Self {
				id: *id,
				applicant_id: *applicant_id,
				..self
			},
		}
	}
}

#[cfg(test)]
mod tests {
	use assert_matches::assert_matches;
	use rstest::*;

	use super::*;

	#[fixture]
	#[once]
	fn application_id() -> ApplicationId {
		ApplicationId::new()
	}

	#[fixture]
	#[once]
	fn user_id() -> UserId {
		UserId::new()
	}

	#[fixture]
	#[once]
	fn project_id() -> ProjectId {
		ProjectId::new()
	}

	#[rstest]
	fn receive_application(
		application_id: &ApplicationId,
		user_id: &UserId,
		project_id: &ProjectId,
	) {
		let before = Utc::now().naive_utc();
		let events = Application::create(*application_id, *project_id, *user_id);
		let after = Utc::now().naive_utc();

		assert_eq!(events.len(), 1);

		assert_matches!(events[0], ApplicationEvent::Received {
			id,
			project_id: project_id_,
			applicant_id,
			received_at,
		} => {
			assert_eq!(id, *application_id);
			assert_eq!(project_id_, *project_id);
			assert_eq!(applicant_id, *user_id);
			assert!(before <= received_at);
			assert!(after >= received_at);
		})
	}
}
