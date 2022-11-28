use super::User;
use domain::ProjectId;

pub(super) struct Admin;

impl User for Admin {
	fn is_leader_on_project(&self, _project_id: &ProjectId) -> bool {
		true
	}
}
