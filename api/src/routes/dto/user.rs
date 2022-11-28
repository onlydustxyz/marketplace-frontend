use crate::domain::{user, User as DomainUser};
use rocket::{
	request::{FromRequest, Outcome},
	Request,
};
use uuid::Uuid;

pub enum User {
	Admin,
	ProjectLead(Vec<Uuid>),
	Public,
}

#[async_trait]
impl<'r> FromRequest<'r> for User {
	type Error = ();

	async fn from_request(request: &'r Request<'_>) -> Outcome<User, ()> {
		if request.headers().get_one("x-hasura-role") == Some("admin") {
			return Outcome::Success(User::Admin);
		}

		let lead_projects: Vec<Uuid> = request
			.headers()
			.get_one("x-hasura-projects_leaded")
			.and_then(|h| serde_json::from_str(&h.replace('{', "[").replace('}', "]")).ok())
			.unwrap_or_default();

		if !lead_projects.is_empty() {
			return Outcome::Success(User::ProjectLead(lead_projects));
		}

		Outcome::Success(User::Public)
	}
}

impl From<User> for Box<dyn DomainUser> {
	fn from(user: User) -> Self {
		match user {
			User::Admin => user::admin(),
			User::ProjectLead(projects) =>
				user::project_leader(projects.into_iter().map(Into::into).collect()),
			User::Public => user::public(),
		}
	}
}
