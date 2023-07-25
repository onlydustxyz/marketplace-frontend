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
use uuid::Uuid;

const IMPERSONATION_SECRET_HEADER: &str = "X-Impersonation-Secret";
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
			Error::Invalid(_) | Error::Impersonation(_) => Status::BadRequest,
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
		deserialize_with = "postgres_array_format::deserialize",
		default = "HashSet::new"
	)]
	pub projects_leaded: HashSet<Uuid>,
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
		match request.headers().get_one(IMPERSONATION_SECRET_HEADER) {
			Some(impersontation_secret_header) => match impersonate(
				impersontation_secret_header,
				request.headers().get_one(IMPERSONATION_CLAIMS_HEADER),
			) {
				Ok(claims) => {
					warn!("Impersonating {:?}", claims);
					Outcome::Success(claims)
				},
				Err(error) => Outcome::Failure((error.clone().into(), error)),
			},

			None => match request.headers().get_one(header::AUTHORIZATION.as_str()) {
				Some(authorization) =>
					match Jwt::from_str(authorization.trim_start_matches("Bearer ")) {
						Ok(jwt) => Outcome::Success(jwt.claims),
						Err(error) => Outcome::Failure((error.clone().into(), error)),
					},
				None => Outcome::Forward(()),
			},
		}
	}
}

fn impersonate(
	impersontation_secret_header: &str,
	impersontation_claims_header: Option<&str>,
) -> Result<Claims> {
	let secret = impersonation_secret()?;
	if secret != impersontation_secret_header {
		Err(Error::Impersonation(
			"Invalid impersonation secret".to_string(),
		))
	} else if impersontation_claims_header.is_none() {
		Err(Error::Impersonation(
			"Missing impersonation claims".to_string(),
		))
	} else {
		serde_json::from_str(impersontation_claims_header.unwrap_or_default())
			.map_err(|e| Error::Impersonation(e.to_string()))
	}
}

fn jwt_secret() -> Result<Secret> {
	let secret = std::env::var("HASURA_GRAPHQL_JWT_SECRET")
		.map_err(|e| Error::Configuration(e.to_string()))?;
	let secret = serde_json::from_str(&secret).map_err(|e| Error::Configuration(e.to_string()))?;
	Ok(secret)
}

fn impersonation_secret() -> Result<String> {
	let secret = std::env::var("HASURA_GRAPHQL_ADMIN_SECRET")
		.map_err(|e| Error::Configuration(e.to_string()))?;
	Ok(secret)
}

mod postgres_array_format {
	use std::collections::HashSet;

	use serde::{self, Deserialize, Deserializer};
	use uuid::Uuid;

	pub fn deserialize<'de, D>(deserializer: D) -> Result<HashSet<Uuid>, D::Error>
	where
		D: Deserializer<'de>,
	{
		let s = String::deserialize(deserializer)?;
		let array: HashSet<Uuid> = serde_json::from_str(&s.replace('{', "[").replace('}', "]"))
			.map_err(serde::de::Error::custom)?;
		Ok(array)
	}
}

#[cfg(test)]
mod test {
	use std::ffi::OsString;

	use assert_matches::assert_matches;
	use envtestkit::{lock::lock_test, set_env};
	use rstest::rstest;
	use serde_json::json;

	use super::*;

	static JWT: &str = "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXByb2plY3RzTGVhZGVkIjoie1wiMjk4YTU0N2YtZWNiNi00YWIyLTg5NzUtNjhmNGU5YmY3YjM5XCJ9IiwieC1oYXN1cmEtZ2l0aHViVXNlcklkIjoiNDM0NjcyNDYiLCJ4LWhhc3VyYS1naXRodWJBY2Nlc3NUb2tlbiI6Imdob19ERjYxVGhveDhKcm5LeDlMMndWNGxMWDl2QWtJYmIyajBiTHQiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm1lIiwicHVibGljIiwicmVnaXN0ZXJlZF91c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InJlZ2lzdGVyZWRfdXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI3NDdlNjYzZi00ZTY4LTRiNDItOTY1Yi1iNWFlYmVkY2Q0YzQiLCJ4LWhhc3VyYS11c2VyLWlzLWFub255bW91cyI6ImZhbHNlIn0sInN1YiI6Ijc0N2U2NjNmLTRlNjgtNGI0Mi05NjViLWI1YWViZWRjZDRjNCIsImlhdCI6MTY4NzUyODkzMSwiZXhwIjozNjg3NTI5ODMxLCJpc3MiOiJoYXN1cmEtYXV0aC1zdGFnaW5nIn0.KlczgHayRpl7A2xEuwQ4VB6DD2m5eB7QRW4f8eSHK2w";
	static SECRET: &str = r#"{"type":"HS256","key":"secret","issuer":"hasura-auth-staging"}"#;

	#[rstest]
	fn missing_secret() {
		let _lock = lock_test();
		let _guard = set_env(OsString::from("HASURA_GRAPHQL_JWT_SECRET"), "");
		assert_matches!(Jwt::from_str(JWT), Err(Error::Configuration(_)));
	}

	#[rstest]
	fn invalid_jwt_signature() {
		let _lock = lock_test();
		let _guard = set_env(
			OsString::from("HASURA_GRAPHQL_JWT_SECRET"),
			r#"{"type":"HS256","key":"another_secret","issuer":"hasura-auth-staging"}"#,
		);

		assert_matches!(Jwt::from_str(JWT), Err(Error::Invalid(_)));
	}

	#[rstest]
	fn invalid_jwt_issuer() {
		let _lock = lock_test();
		let _guard = set_env(
			OsString::from("HASURA_GRAPHQL_JWT_SECRET"),
			r#"{"type":"HS256","key":"secret","issuer":"pirate"}"#,
		);

		assert_matches!(Jwt::from_str(JWT), Err(Error::Invalid(_)));
	}

	#[rstest]
	fn valid_jwt() {
		let _lock = lock_test();
		let _guard = set_env(OsString::from("HASURA_GRAPHQL_JWT_SECRET"), SECRET);

		let jwt = Jwt::from_str(JWT).unwrap();
		assert_eq!(jwt.sub, "747e663f-4e68-4b42-965b-b5aebedcd4c4");
		assert_eq!(jwt.iat, 1687528931);
		assert_eq!(jwt.exp, 3687529831);
		assert_eq!(jwt.iss, "hasura-auth-staging");
		assert_eq!(
			jwt.claims.user_id,
			Uuid::from_str("747e663f-4e68-4b42-965b-b5aebedcd4c4").unwrap()
		);
		assert_eq!(jwt.claims.github_user_id, 43467246);
	}

	#[rstest]
	fn missing_impersonation_secret() {
		let _lock = lock_test();
		assert_matches!(impersonate("any", None), Err(Error::Configuration(_)));
	}

	#[rstest]
	fn invalid_impersonation_secret() {
		let _lock = lock_test();
		let _guard = set_env(
			OsString::from("HASURA_GRAPHQL_ADMIN_SECRET"),
			"super-secret",
		);
		let error_str = assert_matches!(
			impersonate("bad-secret", None),
			Err(Error::Impersonation(s)) => s
		);
		assert_eq!(error_str, "Invalid impersonation secret".to_string())
	}

	#[rstest]
	fn missing_impersonation_claims() {
		let _lock = lock_test();
		let _guard = set_env(
			OsString::from("HASURA_GRAPHQL_ADMIN_SECRET"),
			"super-secret",
		);
		let error_str = assert_matches!(
			impersonate("super-secret", None),
			Err(Error::Impersonation(s)) => s
		);
		assert_eq!(error_str, "Missing impersonation claims".to_string())
	}

	#[rstest]
	fn invalid_impersonation_claims() {
		let _lock = lock_test();
		let _guard = set_env(
			OsString::from("HASURA_GRAPHQL_ADMIN_SECRET"),
			"super-secret",
		);
		let error_str = assert_matches!(
			impersonate("super-secret", Some("{\"foo\": 1}")),
			Err(Error::Impersonation(s)) => s
		);
		assert_eq!(
			error_str,
			"missing field `x-hasura-user-id` at line 1 column 10".to_string()
		)
	}

	#[rstest]
	fn valid_impersonation_claims() {
		let _lock = lock_test();
		let _guard = set_env(
			OsString::from("HASURA_GRAPHQL_ADMIN_SECRET"),
			"super-secret",
		);
		let claims = impersonate(
			"super-secret",
			Some(
				&json!({
					"x-hasura-user-id": "747e663f-4e68-4b42-965b-b5aebedcd4c4",
					"x-hasura-githubUserId":"595505"
				})
				.to_string(),
			),
		)
		.unwrap();
		assert_eq!(
			claims,
			Claims {
				github_user_id: 595505,
				user_id: "747e663f-4e68-4b42-965b-b5aebedcd4c4".parse().unwrap(),
				projects_leaded: HashSet::new()
			}
		)
	}

	#[rstest]
	fn valid_impersonation_claims_with_projects_leaded() {
		let _lock = lock_test();
		let _guard = set_env(
			OsString::from("HASURA_GRAPHQL_ADMIN_SECRET"),
			"super-secret",
		);

		let claims = impersonate("super-secret",
			Some(&json!({
				"x-hasura-user-id": "747e663f-4e68-4b42-965b-b5aebedcd4c4",
				"x-hasura-githubUserId":"595505",
				"x-hasura-projectsLeaded":"{\"e41f44a2-464c-4c96-817f-81acb06b2523\",\"61076487-6ec5-4751-ab0d-3b876c832239\",\"c66b929a-664d-40b9-96c4-90d3efd32a3c\"}"
			}).to_string())
		).unwrap();

		let mut expected_projects_leaded = HashSet::new();
		expected_projects_leaded
			.insert(Uuid::parse_str("e41f44a2-464c-4c96-817f-81acb06b2523").unwrap());
		expected_projects_leaded
			.insert(Uuid::parse_str("61076487-6ec5-4751-ab0d-3b876c832239").unwrap());
		expected_projects_leaded
			.insert(Uuid::parse_str("c66b929a-664d-40b9-96c4-90d3efd32a3c").unwrap());

		assert_eq!(
			claims,
			Claims {
				github_user_id: 595505,
				user_id: "747e663f-4e68-4b42-965b-b5aebedcd4c4".parse().unwrap(),
				projects_leaded: expected_projects_leaded
			}
		)
	}
}
