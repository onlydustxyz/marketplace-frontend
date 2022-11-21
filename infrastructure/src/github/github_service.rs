use super::Client;
use ::serde::{Deserialize, Serialize};
use async_trait::async_trait;
use domain::{GithubClient, GithubClientError, GithubUserId};
use log::error;

#[async_trait]
impl GithubClient for Client {
	async fn authenticate_user(
		&self,
		authorization_code: String,
	) -> Result<GithubUserId, GithubClientError> {
		let access_token = self
			.new_access_token(&authorization_code)
			.await
			.map_err(GithubClientError::Infrastructure)?;

		self.get_user_id(access_token).await.map_err(GithubClientError::Infrastructure)
	}
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

const USER_AGENT: &str = "onlydust-marketplace";

impl Client {
	async fn new_access_token(&self, authorization_code: &str) -> Result<String, anyhow::Error> {
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
			.map_err(anyhow::Error::from)?
			.error_for_status()
			.map_err(anyhow::Error::from)?;

		let body_string = response.text().await.map_err(anyhow::Error::from)?;

		let decoded_body: AccessTokenResponseBody =
			serde_json::from_str(&body_string).map_err(|e| {
				error!("Failed to deserialize github response {body_string} with error {e}");
				anyhow::Error::from(e)
			})?;

		Ok(decoded_body.access_token)
	}

	async fn get_user_id(&self, access_token: String) -> Result<GithubUserId, anyhow::Error> {
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
			.map_err(anyhow::Error::from)?
			.error_for_status()
			.map_err(anyhow::Error::from)?;

		let body_string = response.text().await.map_err(anyhow::Error::from)?;

		let decoded_body: UserResponseBody = serde_json::from_str(&body_string).map_err(|e| {
			error!("Failed to deserialize github response {body_string} with error {e}");
			anyhow::Error::from(e)
		})?;

		Ok(decoded_body.id)
	}
}

#[cfg(test)]
mod tests {
	use super::Client;
	use claim::*;
	use domain::GithubClient;
	use rocket::serde::json::serde_json;
	use serde_json::json;
	use wiremock::{matchers::*, Mock, MockServer, ResponseTemplate};

	// The following test is performed as component test (component as it uses a "real" ephemeral
	// local server) instead of end to end tests because doing the real authentication flow would
	// require a web browser. This test aims to check to requests sent to github are the one
	// expected by github and responses given by github are well decoded.
	#[tokio::test]
	async fn authenticate_user() {
		// Start a server running on a local ephemeral port.
		let server = MockServer::start().await;

		std::env::set_var(
			"GITHUB_ACCESS_TOKEN_URL",
			format!("{}/login/oauth/access_token", &server.uri()),
		);
		std::env::set_var("GITHUB_USER_API_URL", format!("{}/user", &server.uri()));
		std::env::set_var("GITHUB_ID", "foo-github-id");
		std::env::set_var("GITHUB_SECRET", "foo-github-secret");

		let github_client = Client::new();

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

		Mock::given(method("GET"))
			.and(path("/user"))
			.and(header("Accept", "application/json"))
			.and(header(
				"Authorization",
				"token gho_16C7e42F292c6912E7710c838347Ae178B4a",
			))
			.respond_with(ResponseTemplate::new(200).set_body_json(json!({
				"login": "octocat",
				"id": 42,
				"node_id": "MDQ6VXNlcjE=",
			})))
			// Mounting the mock on the mock server - it's now effective!
			.mount(&server)
			.await;

		let result = github_client.authenticate_user("foo-code".to_string()).await;
		assert_ok_eq!(result, 42u64);
	}
}
