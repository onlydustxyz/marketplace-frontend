use chrono::Utc;

use crate::{Aggregate, ApplicationEvent, ApplicationId, ProjectId, UserId};

pub type Application = Aggregate<super::state::State>;

impl Application {
	pub fn create(id: ApplicationId, project_id: ProjectId, applicant_id: UserId) -> Self {
		Self::from_pending_events(vec![ApplicationEvent::Received {
			id,
			project_id,
			applicant_id,
			received_at: Utc::now().naive_utc(),
		}])
	}
}

#[cfg(test)]
mod tests {
	use assert_matches::assert_matches;
	use rstest::*;

	use super::*;
	use crate::Application;

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
		let events =
			Application::create(*application_id, *project_id, *user_id).collect::<Vec<_>>();
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
