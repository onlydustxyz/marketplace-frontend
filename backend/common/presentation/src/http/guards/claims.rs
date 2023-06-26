use std::{env::VarError, str::FromStr};

use async_trait::async_trait;
use jsonwebtoken::{decode, DecodingKey, Validation};
use rocket::{
	http::{hyper::header, Status},
	request::{FromRequest, Outcome},
	Request,
};
use serde::{Deserialize, Serialize};
use serde_with::{serde_as, DisplayFromStr};
use thiserror::Error;
use uuid::Uuid;

#[derive(Debug, Clone, Error, PartialEq, Eq)]
pub enum Error {
	#[error("Invalid JWT")]
	Invalid(#[from] jsonwebtoken::errors::Error),
	#[error("Missing configuration")]
	Configuration(#[from] VarError),
}

type Result<T> = std::result::Result<T, Error>;

impl From<Error> for Status {
	fn from(error: Error) -> Self {
		match error {
			Error::Invalid(_) => Status::BadRequest,
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
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Claims {
	#[serde(rename = "x-hasura-user-id")]
	pub user_id: Uuid,
	#[serde(rename = "x-hasura-githubUserId")]
	#[serde_as(as = "DisplayFromStr")]
	pub github_user_id: u64,
}

impl FromStr for Jwt {
	type Err = Error;

	fn from_str(jwt: &str) -> Result<Self> {
		let mut validation = Validation::default();
		validation.set_issuer(&[jwt_issuer()?]);
		let token = decode::<Jwt>(jwt, &jwt_secret()?, &validation)?;
		Ok(token.claims)
	}
}

#[async_trait]
impl<'r> FromRequest<'r> for Claims {
	type Error = Error;

	async fn from_request(request: &'r Request<'_>) -> Outcome<Self, Self::Error> {
		match request.headers().get_one(header::AUTHORIZATION.as_str()) {
			Some(jwt) => match Jwt::from_str(jwt) {
				Ok(jwt) => Outcome::Success(jwt.claims),
				Err(error) => Outcome::Failure((error.clone().into(), error)),
			},
			None => Outcome::Forward(()),
		}
	}
}

fn jwt_secret() -> Result<DecodingKey> {
	let secret = std::env::var("HASURA_GRAPHQL_JWT_SECRET")?;
	Ok(DecodingKey::from_secret(secret.as_bytes()))
}

fn jwt_issuer() -> Result<String> {
	std::env::var("JWT_ISSUER").map_err(Into::into)
}

#[cfg(test)]
mod test {
	use std::ffi::OsString;

	use assert_matches::assert_matches;
	use envtestkit::{lock::lock_test, set_env};
	use rstest::rstest;

	use super::*;

	static JWT: &str = "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXByb2plY3RzTGVhZGVkIjoie1wiMjk4YTU0N2YtZWNiNi00YWIyLTg5NzUtNjhmNGU5YmY3YjM5XCJ9IiwieC1oYXN1cmEtZ2l0aHViVXNlcklkIjoiNDM0NjcyNDYiLCJ4LWhhc3VyYS1naXRodWJBY2Nlc3NUb2tlbiI6Imdob19ERjYxVGhveDhKcm5LeDlMMndWNGxMWDl2QWtJYmIyajBiTHQiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIm1lIiwicHVibGljIiwicmVnaXN0ZXJlZF91c2VyIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InJlZ2lzdGVyZWRfdXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI3NDdlNjYzZi00ZTY4LTRiNDItOTY1Yi1iNWFlYmVkY2Q0YzQiLCJ4LWhhc3VyYS11c2VyLWlzLWFub255bW91cyI6ImZhbHNlIn0sInN1YiI6Ijc0N2U2NjNmLTRlNjgtNGI0Mi05NjViLWI1YWViZWRjZDRjNCIsImlhdCI6MTY4NzUyODkzMSwiZXhwIjozNjg3NTI5ODMxLCJpc3MiOiJoYXN1cmEtYXV0aC1zdGFnaW5nIn0.KlczgHayRpl7A2xEuwQ4VB6DD2m5eB7QRW4f8eSHK2w";

	#[rstest]
	fn missing_secret() {
		let _lock = lock_test();
		assert_matches!(Jwt::from_str(JWT), Err(Error::Configuration(_)));
	}

	#[rstest]
	fn invalid_jwt_signature() {
		let _lock = lock_test();
		let _guards = (
			set_env(
				OsString::from("HASURA_GRAPHQL_JWT_SECRET"),
				"another_secret",
			),
			set_env(OsString::from("JWT_ISSUER"), "hasura-auth-staging"),
		);

		assert_matches!(Jwt::from_str(JWT), Err(Error::Invalid(_)));
	}

	#[rstest]
	fn invalid_jwt_issuer() {
		let _lock = lock_test();
		let _guards = (
			set_env(OsString::from("HASURA_GRAPHQL_JWT_SECRET"), "secret"),
			set_env(OsString::from("JWT_ISSUER"), "pirate"),
		);

		assert_matches!(Jwt::from_str(JWT), Err(Error::Invalid(_)));
	}

	#[rstest]
	fn valid_jwt() {
		let _lock = lock_test();
		let _guards = (
			set_env(OsString::from("HASURA_GRAPHQL_JWT_SECRET"), "secret"),
			set_env(OsString::from("JWT_ISSUER"), "hasura-auth-staging"),
		);

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
}
