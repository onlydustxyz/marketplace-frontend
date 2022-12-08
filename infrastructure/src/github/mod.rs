use octocrab::{models::Repository, Octocrab, Result};
use std::sync::Arc;

pub struct Client(Arc<Octocrab>);

impl Client {
	pub fn new() -> Self {
		Self(octocrab::instance())
	}

	pub async fn get_repository_by_id(&self, id: u64) -> Result<Repository> {
		self.0.get(format!("{}repositories/{id}", self.0.base_url), None::<&()>).await
	}
}

impl Default for Client {
	fn default() -> Self {
		Self::new()
	}
}
