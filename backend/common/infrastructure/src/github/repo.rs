use anyhow::{anyhow, Result};
use derive_more::*;
use domain::{GithubRepo, LogErr};
use octocrab::models::Repository;
use olog::{error, IntoField};

#[derive(Clone, From, Into)]
pub struct OctocrabRepo(pub Repository);

impl TryFrom<OctocrabRepo> for GithubRepo {
	type Error = anyhow::Error;

	fn try_from(repo: OctocrabRepo) -> Result<GithubRepo> {
		let repo = repo.0;

		let owner = repo.owner.ok_or_else(|| anyhow!("Missing field 'owner'"))?;
		let html_url = repo.html_url.ok_or_else(|| anyhow!("Missing field 'html_url'"))?;

		Ok(GithubRepo {
			id: (repo.id.0 as i64).into(),
			owner: owner.login,
			name: repo.name,
			logo_url: owner.avatar_url,
			html_url,
			description: repo.description.unwrap_or_default(),
			stars: repo.stargazers_count.unwrap_or_default() as i32,
			forks_count: repo.forks_count.unwrap_or_default() as i32,
			parent: repo.parent.map(|repo| OctocrabRepo(*repo)).and_then(|parent| {
				parent
					.try_into()
					.log_err(|e: &anyhow::Error| {
						error!(error = e.to_field(), "Invalid fork parent")
					})
					.map(Box::new)
					.ok()
			}),
		})
	}
}
