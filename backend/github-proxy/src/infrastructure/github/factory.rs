use std::sync::Arc;

use infrastructure::github::{self, Config};

use crate::domain::GithubService;

pub struct ServiceFactory {
	config: Config,
	default_service: Arc<dyn GithubService>,
}

impl ServiceFactory {
	pub fn new(config: &Config) -> anyhow::Result<Self> {
		Ok(Self {
			config: config.clone(),
			default_service: Arc::new(github::RoundRobinClient::new(config)?),
		})
	}

	pub fn with(
		&self,
		personal_access_token: Option<String>,
	) -> anyhow::Result<Arc<dyn GithubService>> {
		match personal_access_token {
			Some(personal_access_token) => Ok(Arc::new(github::SingleClient::new(
				&self.config,
				personal_access_token,
			)?)),
			None => Ok(self.default_service.clone()),
		}
	}
}
