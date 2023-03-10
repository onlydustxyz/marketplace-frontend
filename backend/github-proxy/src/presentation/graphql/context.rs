use std::sync::Arc;

use olog::error;

use super::Error;
use crate::{
	domain::GithubService, infrastructure::GithubServiceFactory,
	presentation::http::guards::OptionGithubPat,
};

pub struct Context {
	pub maybe_github_pat: OptionGithubPat,
	github_service_factory: Arc<GithubServiceFactory>,
}

impl Context {
	pub fn new(
		maybe_github_pat: OptionGithubPat,
		github_service_factory: Arc<GithubServiceFactory>,
	) -> Self {
		Self {
			maybe_github_pat,
			github_service_factory,
		}
	}

	pub fn github_service(&self) -> Result<Arc<dyn GithubService>, Error> {
		self.github_service_factory
			.with((&self.maybe_github_pat).into())
			.map_err(|error| {
				error!(
					error = format!("{error:?}"),
					"Error while building Github client"
				);
				Error::InternalError(error)
			})
	}
}

impl juniper::Context for Context {}
