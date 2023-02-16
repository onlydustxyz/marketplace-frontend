use std::{
	collections::HashMap,
	fmt::Debug,
	sync::{Arc, Mutex},
};

use anyhow::anyhow;
use octocrab::{
	models::{pulls::PullRequest, repos::Content, Repository, User},
	FromResponse, Octocrab, OctocrabBuilder,
};
use olog::{debug, tracing::instrument};
use reqwest::Url;
use serde::Deserialize;

mod error;
pub use error::Error;

mod logged_response;
pub use logged_response::DebugTechnicalHeaders;
use logged_response::LoggedResponse;

#[derive(Deserialize)]
pub struct Config {
	base_url: String,
	personal_access_tokens: String,
	headers: HashMap<String, String>,
}

pub struct Client {
	octocrab_clients: Vec<Octocrab>,
	next_octocrab_clients_index: Arc<Mutex<usize>>,
}

impl Client {
	pub fn new(config: &Config) -> anyhow::Result<Self> {
		let personal_access_tokens: Vec<&str> = config
			.personal_access_tokens
			.split(',')
			.map(|token| token.trim())
			.filter(|token| !token.is_empty())
			.collect();

		if personal_access_tokens.is_empty() {
			return Err(anyhow!(
				"No Github personal_access_token was provided in configuration"
			));
		}

		let octocrab_clients: anyhow::Result<Vec<Octocrab>> = personal_access_tokens
			.iter()
			.map(|personal_access_token| {
				Ok(Octocrab::builder()
					.base_url(&config.base_url)?
					.personal_token(personal_access_token.to_string())
					.add_headers(&config.headers)?
					.build()?)
			})
			.collect();

		debug!(
			"Github API client setup with {} personal access tokens",
			personal_access_tokens.len()
		);

		Ok(Self {
			octocrab_clients: octocrab_clients?,
			next_octocrab_clients_index: Arc::new(Mutex::new(0)),
		})
	}

	fn octocrab(&self) -> &Octocrab {
		let mut index = self.next_octocrab_clients_index.lock().unwrap();
		let next_octocrab = &self.octocrab_clients[*index];
		*index = (*index + 1) % self.octocrab_clients.len();
		next_octocrab
	}

	#[instrument(skip(self))]
	pub async fn get_as<U, R>(&self, url: U) -> Result<R, Error>
	where
		U: AsRef<str> + Debug,
		R: FromResponse,
	{
		let result: LoggedResponse<R> = self.octocrab().get(url, None::<&()>).await?;
		Ok(result.0)
	}

	#[instrument(skip(self))]
	pub async fn get_repository_by_id(&self, id: u64) -> Result<Repository, Error> {
		self.get_as(format!("{}repositories/{id}", self.octocrab().base_url)).await
	}

	#[instrument(skip(self))]
	pub async fn get_user_by_name(&self, username: &str) -> Result<User, Error> {
		self.get_as(format!("{}users/{username}", self.octocrab().base_url)).await
	}

	#[allow(non_snake_case)]
	#[instrument(skip(self))]
	pub async fn get_repository_PRs(&self, id: u64) -> Result<Vec<PullRequest>, Error> {
		self.get_as(format!(
			"{}repositories/{id}/pulls?state=all",
			self.octocrab().base_url
		))
		.await
	}

	#[instrument(skip(self))]
	pub async fn get_user_by_id(&self, id: u64) -> Result<User, Error> {
		self.get_as(format!("{}user/{id}", self.octocrab().base_url)).await
	}

	#[instrument(skip(self))]
	pub async fn get_raw_file(&self, repo: &Repository, path: &str) -> Result<Content, Error> {
		let owner = repo
			.owner
			.as_ref()
			.ok_or_else(|| Error::Other(anyhow!("Missing owner in github repository")))?
			.login
			.clone();

		let mut contents = self
			.octocrab()
			.repos(owner, &repo.name)
			.get_content()
			.path(path)
			.r#ref("HEAD")
			.send()
			.await?;

		contents
			.items
			.pop()
			.ok_or_else(|| Error::NotFound(anyhow!("Could not find {path} in repository")))
	}

	pub fn fix_github_host(&self, url: &Option<Url>) -> anyhow::Result<Option<Url>> {
		Ok(match url {
			Some(url) => Some(
				format!(
					"{}{}",
					self.octocrab().base_url.as_str().trim_end_matches('/'),
					url.path()
				)
				.parse()?,
			),
			None => None,
		})
	}
}

trait AddHeaders: Sized {
	fn add_headers(self, headers: &HashMap<String, String>) -> anyhow::Result<Self>;
}

impl AddHeaders for OctocrabBuilder {
	fn add_headers(mut self, headers: &HashMap<String, String>) -> anyhow::Result<Self> {
		for (key, value) in headers {
			self = self.add_header(key.parse()?, value.clone());
		}
		Ok(self)
	}
}

#[cfg(test)]
mod tests {
	use rstest::rstest;

	use super::*;

	#[rstest]
	#[case("http://plop.fr/github/", Some("https://api.github.com/repos/ning-rain/evens/contributors".parse().unwrap()), Some("http://plop.fr/github/repos/ning-rain/evens/contributors".parse().unwrap()))]
	#[case("http://plop.fr/github", Some("https://api.github.com/repos/ning-rain/evens/contributors".parse().unwrap()), Some("http://plop.fr/github/repos/ning-rain/evens/contributors".parse().unwrap()))]
	#[case("http://plop.fr/github/", Some("https://api.github.com".parse().unwrap()), Some("http://plop.fr/github/".parse().unwrap()))]
	#[case("http://plop.fr/github", Some("https://api.github.com".parse().unwrap()), Some("http://plop.fr/github/".parse().unwrap()))]
	#[case("http://plop.fr/github/", None, None)]
	fn fix_github_host(
		#[case] base_url: &str,
		#[case] url: Option<reqwest::Url>,
		#[case] expected_url: Option<reqwest::Url>,
	) {
		let client = Client::new(&Config {
			base_url: base_url.to_string(),
			personal_access_tokens: "token".to_string(),
			headers: HashMap::new(),
		})
		.unwrap();

		let result_url = client.fix_github_host(&url).unwrap();
		assert_eq!(result_url, expected_url);
	}

	#[rstest]
	#[case("only_one_token".to_string(), 1)]
	#[case("token_a,token_b".to_string(), 2)]
	#[case("token_a, token_b, token_c,,,token_d, token_e,  ,   , token_f".to_string(), 6)]
	fn personal_access_tokens_config(#[case] personal_access_tokens: String, #[case] count: usize) {
		let client = Client::new(&Config {
			base_url: "http://plop.fr/github/".to_string(),
			personal_access_tokens,
			headers: HashMap::new(),
		})
		.unwrap();

		assert_eq!(client.octocrab_clients.len(), count);

		// check the round robin doesn't go out of bounds
		for _ in 0..(count * 3) {
			client.octocrab();
		}
	}

	#[rstest]
	#[case("".to_string())]
	#[case(",".to_string())]
	#[case(", ,,, ,".to_string())]
	fn invalid_personal_access_tokens_config(#[case] personal_access_tokens: String) {
		let result = Client::new(&Config {
			base_url: "http://plop.fr/github/".to_string(),
			personal_access_tokens,
			headers: HashMap::new(),
		});

		assert!(result.is_err());
	}
}
