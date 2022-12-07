use rocket::{
	request::{FromRequest, Outcome},
	Request,
};
use std::collections::HashSet;
use uuid::Uuid;

#[derive(Debug, PartialEq, Eq)]
pub enum Role {
	Admin,
	ProjectLead {
		lead_projects: HashSet<Uuid>,
		owned_budgets: HashSet<Uuid>,
	},
	RegisteredUser,
	Public,
}

#[async_trait]
impl<'r> FromRequest<'r> for Role {
	type Error = ();

	async fn from_request(request: &'r Request<'_>) -> Outcome<Role, ()> {
		match request.headers().get_one("x-hasura-role") {
			Some("admin") => Outcome::Success(Role::Admin),
			Some("project_lead") => from_role_project_lead(request),
			Some("registered_user") => from_role_registered_user(request),
			_ => return Outcome::Success(Role::Public),
		}
	}
}

fn from_role_project_lead(request: &'_ Request<'_>) -> Outcome<Role, ()> {
	if request.headers().get_one("x-hasura-user-id").is_some() {
		let lead_projects: HashSet<Uuid> = request
			.headers()
			.get_one("x-hasura-projectsLeaded")
			.and_then(|h| serde_json::from_str(&h.replace('{', "[").replace('}', "]")).ok())
			.unwrap_or_default();

		let owned_budgets: HashSet<Uuid> = request
			.headers()
			.get_one("x-hasura-budgetsOwned")
			.and_then(|h| serde_json::from_str(&h.replace('{', "[").replace('}', "]")).ok())
			.unwrap_or_default();

		return Outcome::Success(Role::ProjectLead {
			lead_projects,
			owned_budgets,
		});
	}

	Outcome::Success(Role::Public)
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

		let result = Role::from_request(&request).await;
		assert_eq!(result, Outcome::Success(Role::Admin));
	}

	#[rstest]
	async fn from_request_public(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "public"));

		let result = Role::from_request(&request).await;
		assert_eq!(result, Outcome::Success(Role::Public));
	}

	#[rstest]
	async fn from_request_no_role(client: Client) {
		let request: LocalRequest = client.post("/v1/graphql");

		let result = Role::from_request(&request).await;
		assert_eq!(result, Outcome::Success(Role::Public));
	}

	#[rstest]
	async fn from_request_user_without_id(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "user"));

		let result = Role::from_request(&request).await;
		assert_eq!(result, Outcome::Success(Role::Public));
	}

	#[rstest]
	async fn from_request_project_lead(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "project_lead"));
		request.add_header(Header::new("x-hasura-user-id", "42"));

		let result = Role::from_request(&request).await;
		assert_matches!(result.succeeded().unwrap(), Role::ProjectLead { .. });
	}

	#[rstest]
	async fn from_request_registered_user(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "registered_user"));
		request.add_header(Header::new("x-hasura-user-id", "42"));

		let result = Role::from_request(&request).await;
		assert_matches!(result.succeeded().unwrap(), Role::RegisteredUser { .. });
	}
}
