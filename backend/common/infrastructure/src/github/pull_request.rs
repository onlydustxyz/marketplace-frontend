use anyhow::{anyhow, Result};
use domain::{GithubPullRequest, GithubPullRequestStatus, GithubRepoId, GithubUser};

use super::UserFromOctocrab;

pub trait FromOctocrab
where
	Self: Sized,
{
	fn from_octocrab(
		pull_request: octocrab::models::pulls::PullRequest,
		repo_id: GithubRepoId,
	) -> Result<Self>;
}

impl FromOctocrab for GithubPullRequest {
	fn from_octocrab(
		pull_request: octocrab::models::pulls::PullRequest,
		repo_id: GithubRepoId,
	) -> Result<Self> {
		let id = pull_request.id.0.try_into()?;

		let number = pull_request.number.try_into()?;

		let title = pull_request.title.clone().ok_or_else(|| anyhow!("Missing field: 'title'"))?;

		let status = get_status(&pull_request)?;

		let created_at =
			pull_request.created_at.ok_or_else(|| anyhow!("Missing field: 'created_at'"))?;

		let updated_at =
			pull_request.updated_at.ok_or_else(|| anyhow!("Missing field: 'updated_at'"))?;

		let html_url = pull_request.html_url.ok_or_else(|| anyhow!("Missing field: 'html_url'"))?;

		let user = pull_request.user.ok_or_else(|| anyhow!("Missing field: 'user'"))?;

		Ok(domain::GithubPullRequest {
			id,
			repo_id,
			number,
			title,
			author: GithubUser::from_octocrab_user(*user),
			html_url,
			status,
			created_at,
			updated_at,
			merged_at: pull_request.merged_at,
			closed_at: pull_request.closed_at,
		})
	}
}

fn get_status(
	pull_request: &octocrab::models::pulls::PullRequest,
) -> Result<GithubPullRequestStatus> {
	let state = pull_request.state.as_ref().ok_or_else(|| anyhow!("Missing field: 'state'"))?;

	match state {
		octocrab::models::IssueState::Open => Ok(GithubPullRequestStatus::Open),
		octocrab::models::IssueState::Closed => match pull_request.merged_at {
			Some(_) => Ok(GithubPullRequestStatus::Merged),
			None => Ok(GithubPullRequestStatus::Closed),
		},
		_ => Err(anyhow!("Unknown state: '{:?}'", state)),
	}
}
