use std::sync::Arc;

use infrastructure::github::SingleClient as SingleGithubClient;
use olog::error;

use super::Error;
use crate::{domain::GithubService, presentation::http::guards::OptionGithubPat, Config};

pub struct Context {
	pub github_pat: Option<String>,
	config: Config,
	default_github_service: Arc<dyn GithubService>,
}

impl Context {
	pub fn new(
		github_pat: OptionGithubPat,
		config: Config,
		default_github_service: Arc<dyn GithubService>,
	) -> Self {
		Self {
			github_pat: github_pat.into(),
			config,
			default_github_service,
		}
	}

	pub fn github_service_with_user_pat(&self) -> Result<Arc<dyn GithubService>, Error> {
		let client: Arc<dyn GithubService> = match self.github_pat.clone() {
			Some(token) => Arc::new(SingleGithubClient::new(&self.config.github, token).map_err(
				|error| {
					error!(
						error = format!("{error:?}"),
						"Error while building Github client"
					);
					Error::InternalError(error)
				},
			)?),
			None => self.default_github_service.clone(),
		};

		Ok(client)
	}

	pub fn github_service(&self) -> Result<Arc<dyn GithubService>, Error> {
		Ok(self.default_github_service.clone())
	}
}

impl juniper::Context for Context {}
