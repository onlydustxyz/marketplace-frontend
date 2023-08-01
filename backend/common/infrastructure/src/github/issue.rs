use anyhow::{anyhow, Result};
use domain::{GithubIssue, GithubIssueStatus, GithubRepoId, GithubUser};
use octocrab::models::issues::IssueStateReason;

use super::UserFromOctocrab;

pub trait FromOctocrab
where
	Self: Sized,
{
	fn from_octocrab(issue: octocrab::models::issues::Issue, repo_id: GithubRepoId)
	-> Result<Self>;
}

impl FromOctocrab for GithubIssue {
	fn from_octocrab(
		issue: octocrab::models::issues::Issue,
		repo_id: GithubRepoId,
	) -> Result<Self> {
		let id = issue.id.0.into();

		let number = issue.number.try_into()?;

		let status = get_status(&issue)?;

		Ok(domain::GithubIssue {
			id,
			repo_id,
			number,
			title: issue.title,
			author: GithubUser::from_octocrab_user(issue.user),
			html_url: issue.html_url,
			status,
			created_at: issue.created_at,
			updated_at: issue.updated_at,
			closed_at: issue.closed_at,
			assignees: issue
				.assignees
				.iter()
				.map(|user| GithubUser::from_octocrab_user(user.clone()))
				.collect(),
			comments_count: issue.comments as usize,
		})
	}
}

fn get_status(issue: &octocrab::models::issues::Issue) -> Result<GithubIssueStatus> {
	match issue.state {
		octocrab::models::IssueState::Open => Ok(GithubIssueStatus::Open),
		octocrab::models::IssueState::Closed => match issue.state_reason {
			Some(IssueStateReason::NotPlanned) => Ok(GithubIssueStatus::Cancelled),
			_ => Ok(GithubIssueStatus::Completed),
		},
		_ => Err(anyhow!("Unknown state: '{:?}'", issue.state)),
	}
}
