use anyhow::{anyhow, Result};
use derive_more::*;
use domain::GithubRepo;
use octocrab::models::Repository;

#[derive(Clone, From, Into)]
pub struct OctocrabRepo(Repository);

impl TryFrom<OctocrabRepo> for GithubRepo {
	type Error = anyhow::Error;

	fn try_from(repo: OctocrabRepo) -> Result<GithubRepo> {
		let repo = repo.0;

		let owner = repo.owner.ok_or_else(|| anyhow!("Missing field 'owner'"))?;
		let html_url = repo.html_url.ok_or_else(|| anyhow!("Missing field 'html_url'"))?;

		Ok(GithubRepo::new(
			(repo.id.0 as i64).into(),
			owner.login,
			repo.name,
			owner.avatar_url,
			html_url,
			repo.description.unwrap_or_default(),
			repo.stargazers_count.unwrap_or_default() as i32,
			repo.forks_count.unwrap_or_default() as i32,
		))
	}
}
