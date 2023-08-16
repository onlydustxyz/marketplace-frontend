use std::sync::Arc;

use http_api_problem::{HttpApiProblem, StatusCode};
use rocket::State;

use common_domain::{GithubPullRequestNumber, GithubRepoId};
use olog::{error, IntoField};

use crate::presentation::http::github_client_pat_factory::GithubClientPatFactory;

#[get("/api/pull_requests/<repo_owner>/<repo_name>/<pr_number>")]
pub async fn fetch_pull_request(
	repo_owner: String,
	repo_name: String,
	pr_number: i32,
	github_client_factory: &State<Arc<GithubClientPatFactory>>,
) -> Option<dto::github::PullRequest> {
	let pr_number = GithubPullRequestNumber::from(pr_number as i64);
	let pr = github_client_factory
		.github_service()
		.ok()?
		.pull_request(repo_owner.clone(), repo_name.clone(), pr_number.clone())
		.await
		.map(Into::into)
		.map_err(|e| {
			let error_message = format!(
				"Failed to fetch pr for repo_owner {:} and repo_name {:} and pr_number {:}",
				repo_owner, repo_name, pr_number
			);
			error!(error = e.to_field(), "{error_message}");
			HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title(error_message)
				.detail(e.to_string())
		})?;
}

#[get("/api/pull_requests/<repository_id>/<pr_number>")]
pub async fn fetch_pull_request_by_repository_id(
	repository_id: i32,
	pr_number: i32,
	github_client_factory: &State<Arc<GithubClientPatFactory>>,
) -> Option<dto::github::PullRequest> {
	let repository_id = GithubRepoId::from(repository_id as i64);
	let pr_number = GithubPullRequestNumber::from(pr_number as i64);
	github_client_factory
		.github_service()
		.ok()?
		.pull_request_by_repo_id(repository_id, pr_number)
		.await
		.map(Into::into)
		.map_err(|e| {
			let error_message = format!(
				"Failed to fetch pr for repository_id {:} and pr_number {:}",
				repository_id, pr_number
			);
			error!(error = e.to_field(), "{error_message}");
			HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title(error_message)
				.detail(e.to_string())
		})?;
}
