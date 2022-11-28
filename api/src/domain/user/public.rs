use super::User;
use domain::ProjectId;

pub(super) struct Public;

impl User for Public {
	fn is_leader_on_project(&self, _project_id: &ProjectId) -> bool {
		false
	}
}
