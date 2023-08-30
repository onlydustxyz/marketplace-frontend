use std::sync::Arc;

use common_domain::GithubService;
use http_api_problem::{HttpApiProblem, StatusCode};
use infrastructure::{github, github::Config};
use olog::{error, IntoField};

use crate::presentation::http::option_github_pat::OptionGithubPat;

pub struct GithubClientPatFactory {
	github_config: Config,
	default_github_service: Arc<dyn GithubService>,
}

impl GithubClientPatFactory {
	pub fn new(config: Config, default_github_service: Arc<dyn GithubService>) -> Self {
		Self {
			github_config: config,
			default_github_service,
		}
	}

	#[allow(clippy::result_large_err)]
	pub fn github_service_with_user_pat(
		&self,
		github_pat: OptionGithubPat,
	) -> Result<Arc<dyn GithubService>, HttpApiProblem> {
		let github_pat_str: Option<String> = github_pat.into();
		let client: Arc<dyn GithubService> = match github_pat_str {
			Some(token) => {
				let client: Arc<github::Client> =
					github::SingleClient::new(&self.github_config, token)
						.map_err(|e| {
							let error_message = "Error while building Github client";
							error!(error = e.to_field(), "{error_message}");
							HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
								.title(error_message.to_string())
								.detail(e.to_string())
						})?
						.into();
				client
			},
			None => self.default_github_service.clone(),
		};

		Ok(client)
	}

	#[allow(clippy::result_large_err)]
	pub fn github_service(&self) -> Result<Arc<dyn GithubService>, HttpApiProblem> {
		Ok(self.default_github_service.clone())
	}
}
