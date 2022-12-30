use presentation::http::guards::Role;

use crate::domain::{permissions, Permissions};

impl From<Role> for Box<dyn Permissions> {
	fn from(role: Role) -> Self {
		match role {
			Role::Admin => permissions::of_admin(),
			Role::RegisteredUser { owned_budgets, .. } =>
				permissions::of_identified_user(owned_budgets.into_iter().map(Into::into).collect()),
			Role::Public => permissions::of_anonymous(),
		}
	}
}
