use anyhow::{anyhow, Result};
use domain::{GithubPullRequest, GithubPullRequestStatus, GithubUser};
use octocrab::models::{pulls::PullRequest, IssueState};

use super::{OctocrabRepo, UserFromOctocrab};

pub trait FromOctocrab
where
	Self: Sized,
{
	fn from_octocrab(pull_request: PullRequest) -> Result<Self>;
}

impl FromOctocrab for GithubPullRequest {
	fn from_octocrab(pull_request: PullRequest) -> Result<Self> {
		let base_repo = pull_request
			.base
			.repo
			.clone()
			.ok_or_else(|| anyhow!("Missing field: 'base_repo'"))?;

		let head_repo = pull_request
			.head
			.repo
			.clone()
			.ok_or_else(|| anyhow!("Missing field: 'head_repo'"))?;

		let id = pull_request.id.0.try_into()?;

		let number = pull_request.number.try_into()?;

		let title = pull_request.title.clone().ok_or_else(|| anyhow!("Missing field: 'title'"))?;

		let status = get_status(&pull_request)?;

		let created_at =
			pull_request.created_at.ok_or_else(|| anyhow!("Missing field: 'created_at'"))?;

		let updated_at =
			pull_request.updated_at.ok_or_else(|| anyhow!("Missing field: 'updated_at'"))?;

		let html_url = pull_request
			.html_url
			.clone()
			.ok_or_else(|| anyhow!("Missing field: 'html_url'"))?;

		let user = pull_request.user.clone().ok_or_else(|| anyhow!("Missing field: 'user'"))?;

		Ok(GithubPullRequest {
			id,
			repo_id: base_repo.id.0.into(),
			number,
			title,
			author: GithubUser::from_octocrab_user(*user),
			html_url,
			status,
			created_at,
			updated_at,
			merged_at: pull_request.merged_at,
			closed_at: pull_request.closed_at,
			draft: pull_request.draft.unwrap_or_default(),
			head_sha: pull_request.head.sha,
			head_repo: OctocrabRepo(head_repo).try_into()?,
			base_sha: pull_request.base.sha,
			base_repo: OctocrabRepo(base_repo).try_into()?,
			ci_checks: None,
			commits: None,
			reviews: None,
			closing_issue_numbers: None,
		})
	}
}

fn get_status(pull_request: &PullRequest) -> Result<GithubPullRequestStatus> {
	let state = pull_request.state.as_ref().ok_or_else(|| anyhow!("Missing field: 'state'"))?;

	match state {
		IssueState::Open => Ok(GithubPullRequestStatus::Open),
		IssueState::Closed => match pull_request.merged_at {
			Some(_) => Ok(GithubPullRequestStatus::Merged),
			None => Ok(GithubPullRequestStatus::Closed),
		},
		_ => Err(anyhow!("Unknown state: '{:?}'", state)),
	}
}
