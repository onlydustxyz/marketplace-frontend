use std::collections::HashMap;

use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::{
	GithubCodeReview, GithubCodeReviewStatus, GithubIssueNumber, GithubPullRequest,
	GithubPullRequestStatus, GithubUser, GithubUserId, LogErr,
};
use octocrab::models::{
	pulls::{PullRequest, Review},
	repos::RepoCommit,
	CheckRun, CheckStatus, IssueState, User,
};
use olog::{error, warn, IntoField};

use super::{
	code_review::TryIntoReview, commits::FromOctocrab as CommitFromOctocrab, Client,
	UserFromOctocrab,
};

#[async_trait]
pub trait FromOctocrab
where
	Self: Sized,
{
	async fn from_octocrab(client: &Client, pull_request: PullRequest) -> Result<Self>;
}

#[async_trait]
impl FromOctocrab for GithubPullRequest {
	async fn from_octocrab(client: &Client, pull_request: PullRequest) -> Result<Self> {
		let (check_runs, commits, reviews, closing_issue_numbers) = tokio::join!(
			client.get_check_runs(&pull_request),
			client.get_commits(&pull_request),
			client.get_reviews(&pull_request),
			client.get_closing_issues(&pull_request)
		);

		let requested_reviewers = pull_request.requested_reviewers.clone().unwrap_or_default();
		let check_runs = check_runs
			.log_err(|e| {
				warn!(
					error = e.to_field(),
					pull_request = serde_json::to_string(&pull_request).unwrap_or_default(),
					"Unable to fetch check runs"
				)
			})
			.map(|check| check.check_runs)
			.unwrap_or_default();

		let reviews = reviews
			.log_err(|e| {
				warn!(
					error = e.to_field(),
					pull_request = serde_json::to_string(&pull_request).unwrap_or_default(),
					"Unable to fetch code reviews"
				)
			})
			.unwrap_or_default();

		let commits = commits
			.log_err(|e| {
				warn!(
					error = e.to_field(),
					pull_request = serde_json::to_string(&pull_request).unwrap_or_default(),
					"Unable to fetch pull request commits"
				)
			})
			.unwrap_or_default();

		let closing_issue_numbers = closing_issue_numbers
			.log_err(|e| {
				warn!(
					error = e.to_field(),
					pull_request = serde_json::to_string(&pull_request).unwrap_or_default(),
					"Unable to fetch closing issue numbers"
				)
			})
			.unwrap_or_default();

		build_pull_request(
			pull_request.clone(),
			check_runs,
			commits,
			requested_reviewers,
			reviews,
			closing_issue_numbers,
		)
	}
}

fn build_pull_request(
	pull_request: PullRequest,
	check_runs: Vec<CheckRun>,
	commits: Vec<RepoCommit>,
	requested_reviewers: Vec<User>,
	reviews: Vec<Review>,
	closing_issue_numbers: Vec<GithubIssueNumber>,
) -> Result<GithubPullRequest> {
	let repo = pull_request.base.repo.clone().ok_or_else(|| anyhow!("Missing field: 'repo'"))?;

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
		repo_id: repo.id.0.into(),
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
		ci_checks: get_ci_checks(check_runs),
		commits: commits
			.into_iter()
			.filter_map(|commit| {
				CommitFromOctocrab::from_octocrab(commit.clone())
					.log_err(|e| {
						warn!(
							error = e.to_field(),
							pull_request = serde_json::to_string(&pull_request)
								.unwrap_or_else(|_| String::from("{}")),
							commit = serde_json::to_string(&commit)
								.unwrap_or_else(|_| String::from("{}")),
							"Invalid commit"
						)
					})
					.ok()
			})
			.collect(),
		reviews: get_reviews(requested_reviewers, reviews)
			.into_iter()
			.filter(|review| match status {
				GithubPullRequestStatus::Open => true,
				GithubPullRequestStatus::Closed | GithubPullRequestStatus::Merged =>
					review.status == GithubCodeReviewStatus::Completed,
			})
			.collect(),
		closing_issue_numbers,
	})
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

fn get_ci_checks(check_runs: Vec<CheckRun>) -> Option<domain::GithubCiChecks> {
	if check_runs.iter().any(|run| {
		run.status == Some(CheckStatus::Completed)
			&& run.conclusion == Some(String::from("failure"))
	}) {
		// At least one check failed => Failed
		return Some(domain::GithubCiChecks::Failed);
	}

	if check_runs.iter().any(|run| run.status != Some(CheckStatus::Completed)) {
		// At least one check is not completed => None
		return None;
	}

	match check_runs.len() {
		0 => None,                                 // No check => None
		_ => Some(domain::GithubCiChecks::Passed), // All completed, no failure => Passed
	}
}

fn get_reviews(requested_reviewers: Vec<User>, mut reviews: Vec<Review>) -> Vec<GithubCodeReview> {
	// sort reviews by submission date asc
	reviews.sort_by_key(|review| review.submitted_at);

	let reviews: HashMap<GithubUserId, GithubCodeReview> = reviews
		.into_iter()
		.filter_map(|review| {
			review
				.try_into_code_review()
				.log_err(|e| error!(error = e.to_field(), "Invalid review"))
				.ok()
		})
		.chain(requested_reviewers.into_iter().filter_map(|user| {
			user.try_into_code_review()
				.log_err(|e| error!(error = e.to_field(), "Invalid user"))
				.ok()
		}))
		.map(|review| (review.reviewer.id, review))
		.collect();

	let mut reviews: Vec<GithubCodeReview> = reviews.into_values().collect();
	reviews.sort_by_key(|review| review.reviewer.login.clone());

	reviews
}
