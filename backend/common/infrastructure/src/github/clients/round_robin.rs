use std::sync::{Arc, Mutex};

use anyhow::anyhow;
use octocrab::Octocrab;
use olog::info;

use super::{AddHeaders, Config};

/// Github API client that manages a pool of Octocrab instances.
pub struct Client {
    /// List of Octocrab instances, each associated to a personal access token.
	octocrab_clients: Vec<Octocrab>,
    /// Index of the next Octocrab instance to use in `octocrab_clients`, protected by a mutex.
	next_octocrab_clients_index: Arc<Mutex<usize>>,
    /// Config used to create the Octocrab instances.
	config: Config,
}

impl Client {
    /// Creates a new instance of the Github API client that manages a pool of Octocrab instances.
    ///
    /// # Arguments
    ///
    /// * `config` - Configuration used to create the Octocrab instances.
    ///
    /// # Errors
    ///
    /// Returns an error if no `personal_access_token` is provided in the configuration.
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

		info!(
			"Github API client setup with {} personal access tokens",
			personal_access_tokens.len()
		);

		Ok(Self {
			octocrab_clients: octocrab_clients?,
			next_octocrab_clients_index: Arc::new(Mutex::new(0)),
			config: config.clone(),
		})
	}

    /// Gets the next Octocrab instance from the pool of Octocrab instances.
	pub fn octocrab(&self) -> &Octocrab {
		let mut index = self.next_octocrab_clients_index.lock().unwrap();
		let next_octocrab = &self.octocrab_clients[*index];
		*index = (*index + 1) % self.octocrab_clients.len();
		next_octocrab
	}

    /// Gets the configuration used to create the Octocrab instances.
	pub fn config(&self) -> &Config {
		&self.config
	}
}

#[cfg(test)]
mod tests {
	use rstest::rstest;

	use super::*;

	#[rstest]
	#[case("only_one_token".to_string(), 1)]
	#[case("token_a,token_b".to_string(), 2)]
	#[case("token_a, token_b, token_c,,,token_d, token_e,  ,   , token_f".to_string(), 6)]
	fn personal_access_tokens_config(#[case] personal_access_tokens: String, #[case] count: usize) {
		let client = Client::new(&Config {
			base_url: "http://plop.fr/github/".to_string(),
			personal_access_tokens,
			..Default::default()
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
			..Default::default()
		});

		assert!(result.is_err());
	}
}