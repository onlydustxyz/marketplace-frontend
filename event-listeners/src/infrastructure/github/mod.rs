mod github_service;

use anyhow::Result;
use std::sync::Arc;
use tracing::error;

#[derive(Debug, Default)]
pub struct Client {
	octo: Arc<octocrab::Octocrab>,
}

impl Client {
	pub fn initialize() {
		let mut builder = octocrab::Octocrab::builder();

		if let Ok(github_token) = std::env::var("GITHUB_TOKEN") {
			builder = builder.personal_token(github_token);
		}

		octocrab::initialise(builder).expect("Unable to initialize octocrab");
	}

	pub fn new() -> Self {
		Client {
			octo: octocrab::instance(),
		}
	}

	async fn get<R: octocrab::FromResponse>(&self, url: &str) -> Result<R> {
		self.octo.get::<R, &str, ()>(url, None).await.map_err(|e| {
			error!("Failed to get data from github api at {url}: {e}");
			e.into()
		})
	}

	pub async fn user(&self, user_id: &str) -> Result<octocrab::models::User> {
		let user = self
			.get::<octocrab::models::User>(&format!("{}user/{}", self.octo.base_url, user_id))
			.await?;

		Ok(user)
	}
}
