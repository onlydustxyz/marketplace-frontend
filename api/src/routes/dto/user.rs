use crate::domain::{user, User as DomainUser};
use rocket::{
	request::{FromRequest, Outcome},
	Request,
};
use std::collections::HashSet;
use uuid::Uuid;

pub enum User {
	Admin,
	IdentifiedUser {
		lead_projects: HashSet<Uuid>,
		owned_budgets: HashSet<Uuid>,
	},
	Public,
}

#[async_trait]
impl<'r> FromRequest<'r> for User {
	type Error = ();

	async fn from_request(request: &'r Request<'_>) -> Outcome<User, ()> {
		if request.headers().get_one("x-hasura-role") == Some("admin") {
			return Outcome::Success(User::Admin);
		}

		if request.headers().get_one("x-hasura-user-id").is_some() {
			let lead_projects: HashSet<Uuid> = request
				.headers()
				.get_one("x-hasura-projects_leaded")
				.and_then(|h| serde_json::from_str(&h.replace('{', "[").replace('}', "]")).ok())
				.unwrap_or_default();

			let owned_budgets: HashSet<Uuid> = request
				.headers()
				.get_one("x-hasura-budgets_owned")
				.and_then(|h| serde_json::from_str(&h.replace('{', "[").replace('}', "]")).ok())
				.unwrap_or_default();

			return Outcome::Success(User::IdentifiedUser {
				lead_projects,
				owned_budgets,
			});
		}

		Outcome::Success(User::Public)
	}
}

impl From<User> for Box<dyn DomainUser> {
	fn from(user: User) -> Self {
		match user {
			User::Admin => user::admin(),
			User::IdentifiedUser {
				lead_projects,
				owned_budgets,
			} => user::identified_user(
				lead_projects.into_iter().map(Into::into).collect(),
				owned_budgets.into_iter().map(Into::into).collect(),
			),
			User::Public => user::anonymous(),
		}
	}
}
