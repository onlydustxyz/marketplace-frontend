use async_trait::async_trait;
use rocket::serde::{Deserialize, Serialize};

use crate::domain::{
	errors::{AuthenticationError, IdentificationError},
	services::identity_provider::IdentityProvider,
	value_objects::{AccessToken, Identity},
};

const USER_AGENT: &str = "od-marketplace-signup";

pub struct GitHubClient {
	http_client: reqwest::Client,

	access_token_url: String,
	user_api_url: String,

	github_id: String,
	github_secret: String,
}

#[derive(Serialize)]
#[serde(crate = "rocket::serde")]
struct AccessTokenRequestBody<'r> {
	client_id: &'r str,
	client_secret: &'r str,
	code: &'r str,
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct AccessTokenResponseBody {
	access_token: String,
}

#[derive(Deserialize)]
#[serde(crate = "rocket::serde")]
struct UserResponseBody {
	id: u64,
}

impl GitHubClient {
	pub fn new(
		github_id: String,
		github_secret: String,
		access_token_url: String,
		user_api_url: String,
	) -> Self {
		GitHubClient {
			http_client: reqwest::Client::new(),
			access_token_url,
			user_api_url,
			github_id,
			github_secret,
		}
	}
}

#[async_trait]
impl IdentityProvider for GitHubClient {
	async fn new_access_token(
		&self,
		authorization_code: &str,
	) -> Result<AccessToken, AuthenticationError> {
		let request_body = AccessTokenRequestBody {
			client_id: &self.github_id,
			client_secret: &self.github_secret,
			code: authorization_code,
		};

		let response = self
			.http_client
			.post(&self.access_token_url)
			.json(&request_body)
			.header(reqwest::header::ACCEPT, "application/json")
			.header(reqwest::header::USER_AGENT, USER_AGENT)
			.send()
			.await
			.map_err(|e| AuthenticationError::Http(Box::new(e)))?
			.error_for_status()
			.map_err(|e| AuthenticationError::Http(Box::new(e)))?;

		let body_string =
			response.text().await.map_err(|e| AuthenticationError::Http(Box::new(e)))?;

		let decoded_body: AccessTokenResponseBody = serde_json::from_str(&body_string)
			.map_err(|e| AuthenticationError::Serde(Box::new(e), body_string))?;

		Ok(AccessToken::from(decoded_body.access_token))
	}

	async fn get_user_id(
		&self,
		access_token: &AccessToken,
	) -> Result<Identity, IdentificationError> {
		let response = self
			.http_client
			.get(&self.user_api_url)
			.header(reqwest::header::ACCEPT, "application/json")
			.header(reqwest::header::USER_AGENT, USER_AGENT)
			.header(
				reqwest::header::AUTHORIZATION,
				format!("token {}", access_token),
			)
			.send()
			.await
			.map_err(|e| IdentificationError::Http(Box::new(e)))?
			.error_for_status()
			.map_err(|e| IdentificationError::Http(Box::new(e)))?;

		let body_string =
			response.text().await.map_err(|e| IdentificationError::Http(Box::new(e)))?;

		let decoded_body: UserResponseBody = serde_json::from_str(&body_string)
			.map_err(|e| IdentificationError::Serde(Box::new(e), body_string))?;

		Ok(Identity::GitHubId(decoded_body.id.into()))
	}
}

#[cfg(test)]
mod tests {

	use crate::domain::{
		services::identity_provider::IdentityProvider,
		value_objects::{AccessToken, Identity},
	};

	use super::GitHubClient;
	use claim::*;
	use rocket::serde::json::serde_json;
	use rstest::rstest;
	use serde_json::json;
	use wiremock::{matchers::*, Mock, MockServer, ResponseTemplate};

	#[tokio::test]
	async fn new_access_token() {
		// Start a server running on a local ephemeral port.
		let server = MockServer::start().await;

		let github_client = GitHubClient::new(
			"foo-github-id".into(),
			"foo-github-secret".into(),
			format!("{}/login/oauth/access_token", &server.uri()),
			"".into(),
		);

		Mock::given(method("POST"))
			.and(path("/login/oauth/access_token"))
			.and(header("Accept", "application/json"))
			.and(body_json(json!({
				"client_id": "foo-github-id",
				"client_secret": "foo-github-secret",
				"code": "foo-code",
			})))
			.respond_with(ResponseTemplate::new(200).set_body_json(json!({
				"access_token":"gho_16C7e42F292c6912E7710c838347Ae178B4a",
				"scope":"repo,gist",
				"token_type":"bearer",
			})))
			// Mounting the mock on the mock server - it's now effective!
			.mount(&server)
			.await;

		let result = github_client.new_access_token("foo-code").await;

		assert!(result.is_ok());
		assert_eq!(
			"gho_16C7e42F292c6912E7710c838347Ae178B4a".to_string(),
			result.unwrap().to_string()
		);
	}

	#[tokio::test]
	async fn get_user_id() {
		// Start a server running on a local ephemeral port.
		let server = MockServer::start().await;

		let github_client = GitHubClient::new(
			"foo-github-id".into(),
			"foo-github-secret".into(),
			"".into(),
			format!("{}/user", &server.uri()),
		);

		Mock::given(method("GET"))
			.and(path("/user"))
			.and(header("Accept", "application/json"))
			.and(header("Authorization", "token foo-access-token"))
			.respond_with(ResponseTemplate::new(200).set_body_json(json!({
				"login": "octocat",
				"id": 42,
				"node_id": "MDQ6VXNlcjE=",
			})))
			// Mounting the mock on the mock server - it's now effective!
			.mount(&server)
			.await;

		let access_token = AccessToken::from("foo-access-token".to_string());
		let result = github_client.get_user_id(&access_token).await;

		assert_ok_eq!(result, Identity::GitHubId(42.into()));
	}
}
