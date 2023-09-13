use domain::{AggregateRepository, Payment};
use presentation::http::guards::Role;

use crate::domain::{
	permissions::{self, IntoPermission},
	Permissions,
};

impl IntoPermission for Role {
	fn to_permissions(
		&self,
		payment_repository: AggregateRepository<Payment>,
	) -> Box<dyn Permissions> {
		match self {
			Role::Admin => permissions::of_admin(),
			Role::RegisteredUser {
				lead_projects,
				github_user_id,
			} => permissions::of_identified_user(
				lead_projects.iter().map(|id| (*id).into()).collect(),
				*github_user_id,
				payment_repository,
			),
			Role::Public => permissions::of_anonymous(),
		}
	}
}
