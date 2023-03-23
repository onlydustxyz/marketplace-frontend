use std::sync::Arc;

use olog::error;

use super::Error;
use crate::{
	domain::GithubService,
	infrastructure::{GithubServiceBuilder, GithubServiceFactory},
	presentation::http::guards::OptionGithubPat,
	Config,
};

pub struct Context {
	pub github_pat: Option<String>,
	config: Config,
}

impl Context {
	pub fn new(github_pat: OptionGithubPat, config: Config) -> Self {
		Self {
			github_pat: github_pat.into(),
			config,
		}
	}

	pub fn github_service_with_user_pat(&self) -> Result<Arc<dyn GithubService>, Error> {
		match self.github_pat.clone() {
			Some(token) => GithubServiceFactory::new(&self.config.github).with(token).build(),
			None => GithubServiceFactory::new(&self.config.github).build(),
		}
		.map_err(|error| {
			error!(
				error = format!("{error:?}"),
				"Error while building Github client"
			);
			Error::InternalError(error)
		})
	}

	pub fn github_service(&self) -> Result<Arc<dyn GithubService>, Error> {
		GithubServiceFactory::new(&self.config.github).build().map_err(|error| {
			error!(
				error = format!("{error:?}"),
				"Error while building Github client"
			);
			Error::InternalError(error)
		})
	}
}

impl juniper::Context for Context {}
