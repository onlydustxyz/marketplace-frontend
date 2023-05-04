use anyhow::{anyhow, Result};
use domain::{GithubIssue, GithubIssueStatus, GithubIssueType, GithubRepoId, GithubUser};
use octocrab::models::issues::IssueStateReason;

use super::UserFromOctocrab;

pub trait IssueFromOctocrab
where
	Self: Sized,
{
	fn from_octocrab_issue(
		issue: octocrab::models::issues::Issue,
		repo_id: GithubRepoId,
	) -> Result<Self>;

	fn from_octocrab_pull_request(
		pull_request: octocrab::models::pulls::PullRequest,
		repo_id: GithubRepoId,
	) -> Result<Self>;
}

impl IssueFromOctocrab for GithubIssue {
	fn from_octocrab_issue(
		issue: octocrab::models::issues::Issue,
		repo_id: GithubRepoId,
	) -> Result<Self> {
		let id = issue.id.0.into();

		let number = issue.number.try_into()?;

		let issue_type = match issue.pull_request {
			Some(_) => GithubIssueType::PullRequest,
			None => GithubIssueType::Issue,
		};

		let status = get_status_from_issue(&issue)?;

		Ok(domain::GithubIssue::new(
			id,
			repo_id,
			number,
			issue_type,
			issue.title,
			GithubUser::from_octocrab_user(issue.user),
			issue.html_url,
			status,
			issue.created_at,
			issue.updated_at,
			issue.pull_request.and_then(|pr| pr.merged_at),
			issue.closed_at,
		))
	}

	fn from_octocrab_pull_request(
		pull_request: octocrab::models::pulls::PullRequest,
		repo_id: GithubRepoId,
	) -> Result<Self> {
		let id = pull_request.id.0.try_into()?;

		let number = pull_request.number.try_into()?;

		let title = pull_request.title.clone().ok_or_else(|| anyhow!("Missing field: 'title'"))?;

		let status = get_status_from_pull_request(&pull_request)?;

		let created_at =
			pull_request.created_at.ok_or_else(|| anyhow!("Missing field: 'created_at'"))?;

		let updated_at =
			pull_request.updated_at.ok_or_else(|| anyhow!("Missing field: 'updated_at'"))?;

		let html_url = pull_request.html_url.ok_or_else(|| anyhow!("Missing field: 'html_url'"))?;

		let user = pull_request.user.ok_or_else(|| anyhow!("Missing field: 'user'"))?;

		Ok(domain::GithubIssue::new(
			id,
			repo_id,
			number,
			GithubIssueType::PullRequest,
			title,
			GithubUser::from_octocrab_user(*user),
			html_url,
			status,
			created_at,
			updated_at,
			pull_request.merged_at,
			pull_request.closed_at,
		))
	}
}

fn get_status_from_issue(issue: &octocrab::models::issues::Issue) -> Result<GithubIssueStatus> {
	match issue.state {
		octocrab::models::IssueState::Open => Ok(GithubIssueStatus::Open),
		octocrab::models::IssueState::Closed =>
			match issue.pull_request.as_ref().and_then(|pr| pr.merged_at) {
				Some(_) => Ok(GithubIssueStatus::Merged),
				None => match issue.state_reason {
					Some(IssueStateReason::Completed) => Ok(GithubIssueStatus::Completed),
					Some(IssueStateReason::NotPlanned) => Ok(GithubIssueStatus::Cancelled),
					_ => Ok(GithubIssueStatus::Closed),
				},
			},
		_ => Err(anyhow!("Unknown state: '{:?}'", issue.state)),
	}
}

fn get_status_from_pull_request(
	pull_request: &octocrab::models::pulls::PullRequest,
) -> Result<GithubIssueStatus> {
	let state = pull_request.state.as_ref().ok_or_else(|| anyhow!("Missing field: 'state'"))?;

	match state {
		octocrab::models::IssueState::Open => Ok(GithubIssueStatus::Open),
		octocrab::models::IssueState::Closed => match pull_request.merged_at {
			Some(_) => Ok(GithubIssueStatus::Merged),
			None => Ok(GithubIssueStatus::Closed),
		},
		_ => Err(anyhow!("Unknown state: '{:?}'", state)),
	}
}
