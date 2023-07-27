use std::{collections::HashSet, str::FromStr};

use async_trait::async_trait;
use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation};
use olog::warn;
use rocket::{
	http::{hyper::header, Status},
	request::{FromRequest, Outcome},
	Request,
};
use serde::{Deserialize, Serialize};
use serde_with::{serde_as, DisplayFromStr};
use thiserror::Error;
use tracing::instrument;
use uuid::Uuid;

const IMPERSONATION_CLAIMS_HEADER: &str = "X-Impersonation-Claims";

#[derive(Debug, Error, Clone, PartialEq, Eq)]
pub enum Error {
	#[error("Invalid JWT")]
	Invalid(#[from] jsonwebtoken::errors::Error),
	#[error("Invalid impersonation")]
	Impersonation(String),
	#[error("Missing configuration")]
	Configuration(String),
}

type Result<T> = std::result::Result<T, Error>;

impl From<Error> for Status {
	fn from(error: Error) -> Self {
		match error {
			Error::Invalid(_) | Error::Impersonation(_) => Status::Unauthorized,
			Error::Configuration(_) => Status::InternalServerError,
		}
	}
}

#[derive(Debug, Serialize, Deserialize)]
struct Jwt {
	exp: usize,
	iat: usize,
	iss: String,
	sub: String,
	#[serde(rename = "https://hasura.io/jwt/claims")]
	claims: Claims,
}

#[serde_as]
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Claims {
	#[serde(rename = "x-hasura-user-id")]
	pub user_id: Uuid,
	#[serde(rename = "x-hasura-githubUserId")]
	#[serde_as(as = "DisplayFromStr")]
	pub github_user_id: u64,
	#[serde(
		rename = "x-hasura-projectsLeaded",
		deserialize_with = "deserializer::postgres_array",
		default = "HashSet::new"
	)]
	pub projects_leaded: HashSet<Uuid>,

	#[serde(
		rename = "x-hasura-odAdmin",
		deserialize_with = "deserializer::string_bool",
		default
	)]
	pub admin: bool,
}

#[derive(Debug, Serialize, Deserialize)]
struct Secret {
	#[serde(rename = "type")]
	algo: Algorithm,
	key: String,
	issuer: String,
}

impl FromStr for Jwt {
	type Err = Error;

	fn from_str(jwt: &str) -> Result<Self> {
		let secret = jwt_secret()?;

		let mut validation = Validation::new(secret.algo);
		validation.set_issuer(&[secret.issuer]);
		let token = decode::<Jwt>(
			jwt,
			&DecodingKey::from_secret(secret.key.as_bytes()),
			&validation,
		)?;
		Ok(token.claims)
	}
}

#[async_trait]
impl<'r> FromRequest<'r> for Claims {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
		match request.headers().get_one(header::AUTHORIZATION.as_str()) {
			Some(authorization) => match Jwt::from_str(authorization.trim_start_matches("Bearer "))
			{
				Ok(jwt) => match request.headers().get_one(IMPERSONATION_CLAIMS_HEADER) {
					Some(impersontation_claims) => impersonate(&jwt.claims, impersontation_claims),
					None => Outcome::Success(jwt.claims),
				},
				Err(error) => Outcome::Failure((error.clone().into(), error)),
			},
			None => Outcome::Forward(()),
		}
	}
}

#[instrument]
fn impersonate(
	impersonator_claims: &Claims,
	impersontation_claims: &str,
) -> Outcome<Claims, Error> {
	if !impersonator_claims.admin {
		return Outcome::Failure((
			Status::Unauthorized,
			Error::Impersonation("You are not allowed to impersonate users".to_string()),
		));
	}

	match serde_json::from_str(impersontation_claims)
		.map_err(|e| Error::Impersonation(e.to_string()))
	{
		Ok(claims) => {
			warn!(
				impersonator = format!("{:?}", impersonator_claims),
				impersonated = format!("{:?}", claims),
				"Impersonation in progress"
			);
			Outcome::Success(claims)
		},
		Err(error) => Outcome::Failure((error.clone().into(), error)),
	}
}

fn jwt_secret() -> Result<Secret> {
	let secret = std::env::var("HASURA_GRAPHQL_JWT_SECRET")
		.map_err(|e| Error::Configuration(e.to_string()))?;
	let secret = serde_json::from_str(&secret).map_err(|e| Error::Configuration(e.to_string()))?;
	Ok(secret)
}

mod deserializer {
	use std::collections::HashSet;

	use serde::{self, Deserialize, Deserializer};
	use uuid::Uuid;

	pub fn postgres_array<'de, D>(deserializer: D) -> Result<HashSet<Uuid>, D::Error>
	where
		D: Deserializer<'de>,
	{
		let s = String::deserialize(deserializer)?;
		let array: HashSet<Uuid> = serde_json::from_str(&s.replace('{', "[").replace('}', "]"))
			.map_err(serde::de::Error::custom)?;
		Ok(array)
	}

	pub fn string_bool<'de, D>(deserializer: D) -> Result<bool, D::Error>
	where
		D: Deserializer<'de>,
	{
		let s = String::deserialize(deserializer)?;
		Ok(s.eq_ignore_ascii_case("true"))
	}
}

#[cfg(test)]
mod test {

	use assert_matches::assert_matches;
	use rocket::{
		http::Header,
		local::blocking::{Client, LocalRequest},
	};
	use rstest::{fixture, rstest};
	use serde_json::json;

	use super::*;

	static JWT: &str = "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXByb2plY3RzTGVhZGVkIjoie1wiMjk4YTU0N2YtZWNiNi00YWIyLTg5NzUtNjhmNGU5YmY3YjM5XCJ9IiwieC1oYXN1cmEtZ2l0aHViVXNlcklkIjoiNDM0NjcyNDYiLCJ4LWhhc3VyYS1naXRodWJBY2Nlc3NUb2tlbiI6Imdob19ERjYxVGhveDhKcm5LeDlMMndWNGxMWDl2QWtJYmIyajBiTHQiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm1lIiwicHVibGljIiwicmVnaXN0ZXJlZF91c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InJlZ2lzdGVyZWRfdXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI3NDdlNjYzZi00ZTY4LTRiNDItOTY1Yi1iNWFlYmVkY2Q0YzQiLCJ4LWhhc3VyYS11c2VyLWlzLWFub255bW91cyI6ImZhbHNlIn0sInN1YiI6Ijc0N2U2NjNmLTRlNjgtNGI0Mi05NjViLWI1YWViZWRjZDRjNCIsImlhdCI6MTY4NzUyODkzMSwiZXhwIjozNjg3NTI5ODMxLCJpc3MiOiJoYXN1cmEtYXV0aC11bml0LXRlc3RzIn0._WFzxJyqWdrByTw82xFV4nOvf6ZOIuowPLCcc1VcZAw";
	static JWT_ADMIN: &str = "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXByb2plY3RzTGVhZGVkIjoie1wiMjk4YTU0N2YtZWNiNi00YWIyLTg5NzUtNjhmNGU5YmY3YjM5XCJ9IiwieC1oYXN1cmEtZ2l0aHViVXNlcklkIjoiNDM0NjcyNDYiLCJ4LWhhc3VyYS1naXRodWJBY2Nlc3NUb2tlbiI6Imdob19ERjYxVGhveDhKcm5LeDlMMndWNGxMWDl2QWtJYmIyajBiTHQiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm1lIiwicHVibGljIiwicmVnaXN0ZXJlZF91c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InJlZ2lzdGVyZWRfdXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI3NDdlNjYzZi00ZTY4LTRiNDItOTY1Yi1iNWFlYmVkY2Q0YzQiLCJ4LWhhc3VyYS11c2VyLWlzLWFub255bW91cyI6ImZhbHNlIiwieC1oYXN1cmEtb2RBZG1pbiI6InRydWUifSwic3ViIjoiNzQ3ZTY2M2YtNGU2OC00YjQyLTk2NWItYjVhZWJlZGNkNGM0IiwiaWF0IjoxNjg3NTI4OTMxLCJleHAiOjM2ODc1Mjk4MzEsImlzcyI6Imhhc3VyYS1hdXRoLXVuaXQtdGVzdHMifQ.KVg_1WKaJOZApmK92KZ11t2tYw7PKUEKY9ZSU5Lf3XE";
	static SECRET: &str = r#"{"type":"HS256","key":"some-fake-secret-for-unit-tests-some-fake-secret-for-unit-tests","issuer":"hasura-auth-unit-tests"}"#;

	#[fixture]
	fn client() -> Client {
		let rocket = rocket::build();
		Client::untracked(rocket).expect("valid rocket")
	}

	#[fixture]
	fn claims() -> Claims {
		let mut projects_leaded = HashSet::new();
		projects_leaded.insert(Uuid::parse_str("298a547f-ecb6-4ab2-8975-68f4e9bf7b39").unwrap());
		Claims {
			user_id: Uuid::parse_str("747e663f-4e68-4b42-965b-b5aebedcd4c4").unwrap(),
			github_user_id: 43467246,
			projects_leaded,
			admin: false,
		}
	}

	#[fixture]
	fn claims_admin() -> Claims {
		let mut projects_leaded = HashSet::new();
		projects_leaded.insert(Uuid::parse_str("298a547f-ecb6-4ab2-8975-68f4e9bf7b39").unwrap());
		Claims {
			user_id: Uuid::parse_str("747e663f-4e68-4b42-965b-b5aebedcd4c4").unwrap(),
			github_user_id: 43467246,
			projects_leaded,
			admin: true,
		}
	}

	#[rstest]
	fn missing_secret() {
		temp_env::with_var("HASURA_GRAPHQL_JWT_SECRET", Some(""), || {
			assert_matches!(Jwt::from_str(JWT), Err(Error::Configuration(_)));
		});
	}

	#[rstest]
	async fn from_request_with_jwt(client: Client, claims: Claims) {
		temp_env::async_with_vars([("HASURA_GRAPHQL_JWT_SECRET", Some(SECRET))], async {
			let mut request: LocalRequest = client.post("/v1/graphql");
			request.add_header(Header::new("Authorization", format!("Bearer {JWT}")));

			let result = request.guard::<Claims>().await;
			assert_eq!(result, Outcome::Success(claims));
		})
		.await;
	}

	#[rstest]
	async fn from_request_with_jwt_admin(client: Client, claims_admin: Claims) {
		temp_env::async_with_vars([("HASURA_GRAPHQL_JWT_SECRET", Some(SECRET))], async {
			let mut request: LocalRequest = client.post("/v1/graphql");
			request.add_header(Header::new("Authorization", format!("Bearer {JWT_ADMIN}")));

			let result = request.guard::<Claims>().await;
			assert_eq!(result, Outcome::Success(claims_admin));
		})
		.await;
	}

	#[rstest]
	async fn from_request_with_jwt_and_impersonation(client: Client) {
		temp_env::async_with_vars([("HASURA_GRAPHQL_JWT_SECRET", Some(SECRET))], async {
			let mut request: LocalRequest = client.post("/v1/graphql");
			request.add_header(Header::new("Authorization", format!("Bearer {JWT}")));
			request.add_header(Header::new(
				IMPERSONATION_CLAIMS_HEADER,
				json!({
					"x-hasura-user-id": "747e663f-4e68-4b42-965b-b5aebedcd4c4",
					"x-hasura-githubUserId":"595505"
				})
				.to_string(),
			));

			let result = request.guard::<Claims>().await;
			assert_matches!(result, Outcome::Failure(_));
		})
		.await;
	}

	#[rstest]
	async fn from_request_with_jwt_admin_and_impersonation(client: Client) {
		temp_env::async_with_vars([("HASURA_GRAPHQL_JWT_SECRET", Some(SECRET))], async {
			let mut request: LocalRequest = client.post("/v1/graphql");
			request.add_header(Header::new("Authorization", format!("Bearer {JWT_ADMIN}")));
			request.add_header(Header::new(
				IMPERSONATION_CLAIMS_HEADER,
				json!({
					"x-hasura-user-id": "747e663f-4e68-4b42-965b-b5aebedcd4c4",
					"x-hasura-githubUserId":"595505"
				})
				.to_string(),
			));

			let result = request.guard::<Claims>().await;
			assert_eq!(
				result,
				Outcome::Success(Claims {
					github_user_id: 595505,
					user_id: "747e663f-4e68-4b42-965b-b5aebedcd4c4".parse().unwrap(),
					projects_leaded: HashSet::new(),
					admin: false
				})
			);
		})
		.await;
	}

	#[rstest]
	async fn invalid_jwt_signature(client: Client) {
		temp_env::async_with_vars(
			[(
				"HASURA_GRAPHQL_JWT_SECRET",
				Some(
					r#"{"type":"HS256","key":"another_secret","issuer":"hasura-auth-unit-tests"}"#,
				),
			)],
			async {
				assert_matches!(Jwt::from_str(JWT), Err(Error::Invalid(_)));

				let mut request: LocalRequest = client.post("/v1/graphql");
				request.add_header(Header::new("Authorization", format!("Bearer {JWT_ADMIN}")));

				let result = request.guard::<Claims>().await;
				assert_matches!(result, Outcome::Failure(_));
			},
		)
		.await;
	}

	#[rstest]
	async fn invalid_jwt_issuer(client: Client) {
		temp_env::async_with_vars(
			[(
				"HASURA_GRAPHQL_JWT_SECRET",
				Some(
					r#"{"type":"HS256","key":"some-fake-secret-for-unit-tests-some-fake-secret-for-unit-tests","issuer":"pirate"}"#,
				),
			)],
			async {
				assert_matches!(Jwt::from_str(JWT), Err(Error::Invalid(_)));

				let mut request: LocalRequest = client.post("/v1/graphql");
				request.add_header(Header::new("Authorization", format!("Bearer {JWT_ADMIN}")));

				let result = request.guard::<Claims>().await;
				assert_matches!(result, Outcome::Failure(_));
			},
		).await;
	}

	#[rstest]
	fn valid_jwt() {
		temp_env::with_var("HASURA_GRAPHQL_JWT_SECRET", Some(SECRET), || {
			let jwt = Jwt::from_str(JWT).unwrap();
			assert_eq!(jwt.sub, "747e663f-4e68-4b42-965b-b5aebedcd4c4");
			assert_eq!(jwt.iat, 1687528931);
			assert_eq!(jwt.exp, 3687529831);
			assert_eq!(jwt.iss, "hasura-auth-unit-tests");
			assert_eq!(
				jwt.claims.user_id,
				Uuid::from_str("747e663f-4e68-4b42-965b-b5aebedcd4c4").unwrap()
			);
			assert_eq!(jwt.claims.github_user_id, 43467246);
		});
	}

	#[rstest]
	fn parse_invalid_impersonation_claims(claims_admin: Claims) {
		let error_str = assert_matches!(
			impersonate(&claims_admin, "{\"foo\": 1}"),
			Outcome::Failure((_,Error::Impersonation(s))) => s
		);
		assert_eq!(
			error_str,
			"missing field `x-hasura-user-id` at line 1 column 10".to_string()
		)
	}

	#[rstest]
	fn parse_valid_impersonation_claims(claims_admin: Claims) {
		let impersonated_claims = impersonate(
			&claims_admin,
			&json!({
				"x-hasura-user-id": "747e663f-4e68-4b42-965b-b5aebedcd4c4",
				"x-hasura-githubUserId":"595505"
			})
			.to_string(),
		)
		.unwrap();
		assert_eq!(
			impersonated_claims,
			Claims {
				github_user_id: 595505,
				user_id: "747e663f-4e68-4b42-965b-b5aebedcd4c4".parse().unwrap(),
				projects_leaded: HashSet::new(),
				admin: false
			}
		)
	}

	#[rstest]
	fn parse_valid_impersonation_claims_with_projects_leaded(claims_admin: Claims) {
		let impersonated_claims = impersonate(&claims_admin,
			&json!({
				"x-hasura-user-id": "747e663f-4e68-4b42-965b-b5aebedcd4c4",
				"x-hasura-githubUserId":"595505",
				"x-hasura-projectsLeaded":"{\"e41f44a2-464c-4c96-817f-81acb06b2523\",\"61076487-6ec5-4751-ab0d-3b876c832239\",\"c66b929a-664d-40b9-96c4-90d3efd32a3c\"}"
			}).to_string()
		).unwrap();

		let mut expected_projects_leaded = HashSet::new();
		expected_projects_leaded
			.insert(Uuid::parse_str("e41f44a2-464c-4c96-817f-81acb06b2523").unwrap());
		expected_projects_leaded
			.insert(Uuid::parse_str("61076487-6ec5-4751-ab0d-3b876c832239").unwrap());
		expected_projects_leaded
			.insert(Uuid::parse_str("c66b929a-664d-40b9-96c4-90d3efd32a3c").unwrap());

		assert_eq!(
			impersonated_claims,
			Claims {
				github_user_id: 595505,
				user_id: "747e663f-4e68-4b42-965b-b5aebedcd4c4".parse().unwrap(),
				projects_leaded: expected_projects_leaded,
				admin: false
			}
		)
	}
}
