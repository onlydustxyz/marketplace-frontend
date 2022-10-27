use log::debug;
use reqwest::{self, header, Body};
use serde::Deserialize;
use std::time::Duration;

#[derive(Deserialize)]
struct HerokuError {
	error: String,
}

pub struct HerokuEndpoint {
	method: reqwest::Method,
	path: String,
	body: Option<Body>,
}

impl HerokuEndpoint {
	pub fn new(method: reqwest::Method, path: String, body: Option<Body>) -> Self {
		Self { method, path, body }
	}
}

pub struct HerokuClient {
	http_client: reqwest::Client,
}

impl HerokuClient {
	pub fn new() -> Result<Self, anyhow::Error> {
		let mut headers = header::HeaderMap::new();
		headers.insert(
			reqwest::header::ACCEPT,
			header::HeaderValue::from_static("application/vnd.heroku+json; version=3"),
		);
		headers.insert(
			reqwest::header::USER_AGENT,
			header::HeaderValue::from_static("marketplace-indexer"),
		);
		headers.insert(
			reqwest::header::AUTHORIZATION,
			header::HeaderValue::from_str(&format!("Bearer {}", heroku_token()?))?,
		);

		let http_client = reqwest::Client::builder()
			.timeout(Duration::from_secs(30))
			.default_headers(headers)
			.build()?;

		Ok(Self { http_client })
	}

	pub async fn request(
		&self,
		endpoint: HerokuEndpoint,
	) -> Result<reqwest::Response, anyhow::Error> {
		let url = url::Url::parse(&heroku_server_url())?.join(&endpoint.path)?;
		let mut request = self.http_client.request(endpoint.method, url);

		if let Some(body) = endpoint.body {
			request = request.body(body);
		}

		debug!("Request: {:?}", request);
		let response = request.send().await?;
		debug!("Response: {:?}", response);

		if !response.status().is_success() {
			return Err(anyhow::Error::msg(
				response.json::<HerokuError>().await?.error,
			));
		}

		Ok(response)
	}
}

fn heroku_token() -> Result<String, anyhow::Error> {
	std::env::var("HEROKU_TOKEN").map_err(|_| anyhow::Error::msg("HEROKU_TOKEN var must be set"))
}

#[cfg(not(test))]
fn heroku_server_url() -> String {
	String::from("https://api.heroku.com/")
}

#[cfg(test)]
fn heroku_server_url() -> String {
	mockito::server_url()
}
