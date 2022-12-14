use presentation::http::guards::Role;

use crate::domain::{permissions, Permissions};

impl From<Role> for Box<dyn Permissions> {
	fn from(role: Role) -> Self {
		match role {
			Role::Admin => permissions::of_admin(),
			Role::RegisteredUser {
				lead_projects,
				owned_budgets,
			} => permissions::of_identified_user(
				lead_projects.into_iter().map(Into::into).collect(),
				owned_budgets.into_iter().map(Into::into).collect(),
			),
			Role::Public => permissions::of_anonymous(),
		}
	}
}
