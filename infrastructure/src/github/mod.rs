use anyhow::{anyhow, Result};
use octocrab::{
	models::{repos::Content, Repository},
	FromResponse, Octocrab,
};
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
		let result = self.0.get(url, None::<&()>).await?;
		Ok(result)
	}

	pub async fn get_repository_by_id(&self, id: u64) -> Result<Repository> {
		self.get_as(format!("{}repositories/{id}", self.0.base_url)).await
	}

	pub async fn get_raw_file(&self, repo: &Repository, path: &str) -> Result<Content> {
		let owner = repo
			.owner
			.as_ref()
			.ok_or_else(|| anyhow!("Missing owner in github repository"))?
			.login
			.clone();

		let mut contents = octocrab::instance()
			.repos(owner, &repo.name)
			.get_content()
			.path(path)
			.r#ref("HEAD")
			.send()
			.await?;

		contents
			.items
			.pop()
			.ok_or_else(|| anyhow!("Could not find {path} in repository"))
	}
}

impl Default for Client {
	fn default() -> Self {
		Self::new()
	}
}
