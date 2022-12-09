use octocrab::{models::Repository, FromResponse, Octocrab, Result};
use std::sync::Arc;

pub struct Client(Arc<Octocrab>);

impl Client {
	pub fn new() -> Self {
		Self(octocrab::instance())
	}

	pub async fn get_as<U, R>(&self, url: U) -> Result<R>
	where
		U: AsRef<str>,
		R: FromResponse,
	{
		self.0.get(url, None::<&()>).await
	}

	pub async fn get_repository_by_id(&self, id: u64) -> Result<Repository> {
		self.get_as(format!("{}repositories/{id}", self.0.base_url)).await
	}
}

impl Default for Client {
	fn default() -> Self {
		Self::new()
	}
}
