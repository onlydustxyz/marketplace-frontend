use std::collections::HashSet;

use domain::GithubUserId;
use rocket::{
	request::{FromRequest, Outcome},
	Request,
};
use thiserror::Error;
use uuid::Uuid;

use super::{claims, Claims};

#[derive(Debug, PartialEq, Eq)]
pub enum Role {
	Admin,
	RegisteredUser {
		lead_projects: HashSet<Uuid>,
		github_user_id: GithubUserId,
	},
	Public,
}

#[derive(Debug, Error, Clone, PartialEq, Eq)]
pub enum Error {
	#[error("Invalid claims")]
	Invalid(#[from] claims::Error),
}

#[async_trait]
impl<'r> FromRequest<'r> for Role {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Role, Error> {
		match request.headers().get_one("x-hasura-role") {
			Some("admin") => Outcome::Success(Role::Admin),
			Some("registered_user") => from_role_registered_user(request).await,
			_ => return Outcome::Success(Role::Public),
		}
	}
}

async fn from_role_registered_user(request: &'_ Request<'_>) -> Outcome<Role, Error> {
	match request.guard::<Claims>().await {
		Outcome::Success(claims) => Outcome::Success(Role::RegisteredUser {
			lead_projects: claims.projects_leaded.clone(),
			github_user_id: claims.github_user_id.into(),
		}),
		Outcome::Failure((status, error)) => Outcome::Failure((status, error.into())),
		Outcome::Forward(_) => Outcome::Success(Role::Public),
	}
}

#[cfg(test)]
mod tests {

	use rocket::{
		http::Header,
		local::blocking::{Client, LocalRequest},
	};
	use rstest::{fixture, rstest};

	use super::*;

	static JWT: &str = "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXByb2plY3RzTGVhZGVkIjoie1wiMjk4YTU0N2YtZWNiNi00YWIyLTg5NzUtNjhmNGU5YmY3YjM5XCJ9IiwieC1oYXN1cmEtZ2l0aHViVXNlcklkIjoiNDM0NjcyNDYiLCJ4LWhhc3VyYS1naXRodWJBY2Nlc3NUb2tlbiI6Imdob19ERjYxVGhveDhKcm5LeDlMMndWNGxMWDl2QWtJYmIyajBiTHQiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm1lIiwicHVibGljIiwicmVnaXN0ZXJlZF91c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InJlZ2lzdGVyZWRfdXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI3NDdlNjYzZi00ZTY4LTRiNDItOTY1Yi1iNWFlYmVkY2Q0YzQiLCJ4LWhhc3VyYS11c2VyLWlzLWFub255bW91cyI6ImZhbHNlIn0sInN1YiI6Ijc0N2U2NjNmLTRlNjgtNGI0Mi05NjViLWI1YWViZWRjZDRjNCIsImlhdCI6MTY4NzUyODkzMSwiZXhwIjozNjg3NTI5ODMxLCJpc3MiOiJoYXN1cmEtYXV0aC1zdGFnaW5nIn0.KlczgHayRpl7A2xEuwQ4VB6DD2m5eB7QRW4f8eSHK2w";
	static JWT_SECRET: &str = r#"{"type":"HS256","key":"secret","issuer":"hasura-auth-staging"}"#;

	#[fixture]
	fn client() -> Client {
		let rocket = rocket::build();
		Client::untracked(rocket).expect("valid rocket")
	}

	#[rstest]
	async fn from_request_admin(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "admin"));

		let result = request.guard::<Role>().await;
		assert_eq!(result, Outcome::Success(Role::Admin));
	}

	#[rstest]
	async fn from_request_public(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "public"));

		let result = request.guard::<Role>().await;
		assert_eq!(result, Outcome::Success(Role::Public));
	}

	#[rstest]
	async fn from_request_no_role(client: Client) {
		let request: LocalRequest = client.post("/v1/graphql");

		let result = request.guard::<Role>().await;
		assert_eq!(result, Outcome::Success(Role::Public));
	}

	#[rstest]
	async fn from_request_user_without_id(client: Client) {
		let mut request: LocalRequest = client.post("/v1/graphql");
		request.add_header(Header::new("x-hasura-role", "registered_user"));

		let result = request.guard::<Role>().await;
		assert_eq!(result, Outcome::Success(Role::Public));
	}

	#[rstest]
	async fn from_request_registered_user(client: Client) {
		temp_env::async_with_vars([("HASURA_GRAPHQL_JWT_SECRET", Some(JWT_SECRET))], async {
			let mut request: LocalRequest = client.post("/v1/graphql");
			request.add_header(Header::new("x-hasura-role", "registered_user"));
			request.add_header(Header::new("Authorization", format!("Bearer {JWT}")));

			let result = request.guard::<Role>().await;

			let mut expected_projects_leaded = HashSet::new();
			expected_projects_leaded
				.insert(Uuid::parse_str("298a547f-ecb6-4ab2-8975-68f4e9bf7b39").unwrap());
			assert_eq!(
				result.succeeded().unwrap(),
				Role::RegisteredUser {
					github_user_id: GithubUserId::from(43467246u64),
					lead_projects: expected_projects_leaded
				}
			);
		})
		.await;
	}
}
