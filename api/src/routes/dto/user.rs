use crate::domain::{user, User as DomainUser};
use rocket::{
	request::{FromRequest, Outcome},
	Request,
};
use std::collections::HashSet;
use uuid::Uuid;

#[derive(Debug, PartialEq, Eq)]
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
		match request.headers().get_one("x-hasura-role") {
			Some("admin") => Outcome::Success(User::Admin),
			Some("user") => from_user_role(request),
			_ => return Outcome::Success(User::Public),
		}
	}
}

fn from_user_role(request: &'_ Request<'_>) -> Outcome<User, ()> {
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

#[cfg(test)]
mod tests {
	use super::*;
	use assert_matches::assert_matches;
	use rocket::{
		http::Header,
		local::blocking::{Client, LocalRequest},
	};
	use rstest::{fixture, rstest};

	#[fixture]
	fn client() -> Client {
		let rocket = rocket::build();
		Client::untracked(rocket).expect("valid rocket")
	}

	#[rstest]
	async fn from_request_admin(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "admin"));

		let result = User::from_request(&request).await;
		assert_eq!(result, Outcome::Success(User::Admin));
	}

	#[rstest]
	async fn from_request_public(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "public"));

		let result = User::from_request(&request).await;
		assert_eq!(result, Outcome::Success(User::Public));
	}

	#[rstest]
	async fn from_request_no_role(client: Client) {
		let request: LocalRequest = client.post("/v1/graphql");

		let result = User::from_request(&request).await;
		assert_eq!(result, Outcome::Success(User::Public));
	}

	#[rstest]
	async fn from_request_user_without_id(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "user"));

		let result = User::from_request(&request).await;
		assert_eq!(result, Outcome::Success(User::Public));
	}

	#[rstest]
	async fn from_request_user(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "user"));
		request.add_header(Header::new("x-hasura-user-id", "42"));

		let result = User::from_request(&request).await;
		assert_matches!(result.succeeded().unwrap(), User::IdentifiedUser { .. });
	}
}
