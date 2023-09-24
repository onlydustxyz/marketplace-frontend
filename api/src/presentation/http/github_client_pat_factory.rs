use std::sync::Arc;

use common_domain::GithubService;
use http_api_problem::{HttpApiProblem, StatusCode};
use infrastructure::{github, github::Config};
use olog::{error, IntoField};

pub struct GithubClientPatFactory {
	github_config: Config,
}

impl GithubClientPatFactory {
	pub fn new(config: Config) -> Self {
		Self {
			github_config: config,
		}
	}

	#[allow(clippy::result_large_err)]
	pub fn github_service(&self, token: String) -> Result<Arc<dyn GithubService>, HttpApiProblem> {
		let client: Arc<github::Client> = github::SingleClient::new(&self.github_config, token)
			.map_err(|e| {
				let error_message = "Error while building Github client";
				error!(error = e.to_field(), "{error_message}");
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title(error_message.to_string())
					.detail(e.to_string())
			})?
			.into();

		Ok(client)
	}
}
