use std::sync::Arc;

use domain::GithubService;
use infrastructure::github;
use olog::error;

use super::Error;
use crate::{presentation::http::guards::OptionGithubPat, Config};

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
			Some(token) => {
				let client: Arc<github::Client> =
					github::SingleClient::new(&self.config.github, token)
						.map_err(|error| {
							error!(
								error = format!("{error:?}"),
								"Error while building Github client"
							);
							Error::InternalError(error)
						})?
						.into();
				client
			},
			None => self.default_github_service.clone(),
		};

		Ok(client)
	}

	pub fn github_service(&self) -> Result<Arc<dyn GithubService>, Error> {
		Ok(self.default_github_service.clone())
	}
}

impl juniper::Context for Context {}
