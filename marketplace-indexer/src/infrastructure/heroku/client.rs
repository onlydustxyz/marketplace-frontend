use log::debug;
use reqwest::{self, header, Body};
use serde::Deserialize;
use std::time::Duration;

const HEROKU_URL: &str = "https://api.heroku.com/";

pub struct HttpApiClient {
	http_client: reqwest::Client,
	base_url: url::Url,
}

impl HttpApiClient {
	pub fn create(token: &str) -> Result<HttpApiClient, anyhow::Error> {
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
			header::HeaderValue::from_str(&format!("Bearer {}", token))?,
		);

		let http_client = reqwest::Client::builder()
			.timeout(Duration::from_secs(30))
			.default_headers(headers)
			.build()?;

		let base_url = url::Url::parse(HEROKU_URL)?;

		Ok(HttpApiClient {
			http_client,
			base_url,
		})
	}
}

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

impl HttpApiClient {
	pub async fn request(
		&self,
		endpoint: HerokuEndpoint,
	) -> Result<reqwest::Response, anyhow::Error> {
		let url = self.base_url.join(&endpoint.path)?;
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
