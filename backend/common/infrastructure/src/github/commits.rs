use anyhow::{anyhow, Context, Result};
use domain::GithubCommit;

use super::UserFromOctocrab;

pub trait FromOctocrab
where
	Self: Sized,
{
	fn from_octocrab(commit: octocrab::models::repos::RepoCommit) -> Result<Self>;
}

impl FromOctocrab for GithubCommit {
	fn from_octocrab(commit: octocrab::models::repos::RepoCommit) -> Result<Self> {
		Ok(GithubCommit {
			sha: commit.sha,
			html_url: commit.html_url.parse().context("Parsing commit html_url")?,
			author: UserFromOctocrab::from_octocrab_user(
				commit
					.author
					.or(commit.committer)
					.ok_or_else(|| anyhow!("Missing commit's committer and author"))?,
			),
		})
	}
}
