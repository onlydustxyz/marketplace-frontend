use std::sync::Arc;

use infrastructure::github::{self, Config};

use crate::domain::GithubService;

pub struct ServiceFactory {
	config: Config,
}

pub trait Builder {
	fn build(&self) -> anyhow::Result<Arc<dyn GithubService>>;
}

impl ServiceFactory {
	pub fn new(config: &Config) -> Self {
		Self {
			config: config.clone(),
		}
	}

	pub fn with(self, personal_access_token: String) -> UserTokenFactory {
		UserTokenFactory {
			config: self.config,
			personal_access_token,
		}
	}
}

impl Builder for ServiceFactory {
	fn build(&self) -> anyhow::Result<Arc<dyn GithubService>> {
		Ok(Arc::new(github::RoundRobinClient::new(&self.config)?))
	}
}

pub struct UserTokenFactory {
	config: Config,
	personal_access_token: String,
}

impl Builder for UserTokenFactory {
	fn build(&self) -> anyhow::Result<Arc<dyn GithubService>> {
		Ok(Arc::new(github::SingleClient::new(
			&self.config,
			self.personal_access_token.clone(),
		)?))
	}
}
