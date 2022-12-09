use anyhow::{anyhow, Result};
use octocrab::{
	models::{repos::Content, Repository},
	FromResponse, Octocrab,
};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct Config {
	base_url: String,
	personal_access_token: String,
}

pub struct Client(Octocrab);

impl Client {
	pub fn new(config: Config) -> Result<Self> {
		let instance = Octocrab::builder()
			.base_url(config.base_url)?
			.personal_token(config.personal_access_token)
			.build()?;
		Ok(Self(instance))
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
