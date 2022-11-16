mod errors;
mod github_service;

pub use errors::Error as GithubError;

pub struct Client {
	http_client: reqwest::Client,
	access_token_url: String,
	user_api_url: String,
	github_id: String,
	github_secret: String,
}

fn access_token_url() -> String {
	std::env::var("GITHUB_ACCESS_TOKEN_URL")
		.unwrap_or_else(|_| "https://github.com/login/oauth/access_token".to_string())
}

fn user_api_url() -> String {
	std::env::var("GITHUB_USER_API_URL")
		.unwrap_or_else(|_| "https://api.github.com/user".to_string())
}

fn github_client_id() -> String {
	std::env::var("GITHUB_ID").expect("GITHUB_ID environment variable must be set")
}

fn github_client_secret() -> String {
	std::env::var("GITHUB_SECRET").expect("GITHUB_SECRET environment variable must be set")
}

impl Client {
	pub fn new() -> Self {
		Client {
			http_client: reqwest::Client::new(),
			access_token_url: access_token_url(),
			user_api_url: user_api_url(),
			github_id: github_client_id(),
			github_secret: github_client_secret(),
		}
	}
}

impl Default for Client {
	fn default() -> Self {
		Self::new()
	}
}
