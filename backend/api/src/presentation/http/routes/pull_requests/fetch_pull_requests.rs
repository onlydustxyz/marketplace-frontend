use std::sync::Arc;

use common_domain::GithubPullRequestNumber;
use http_api_problem::{HttpApiProblem, StatusCode};
use olog::{error, IntoField};
use presentation::http::guards::Claims;
use rocket::{serde::json::Json, State};

use crate::presentation::http::{
	github_client_pat_factory::GithubClientPatFactory, routes::pull_requests::dto::Response,
};

#[get("/pull_requests/<repo_owner>/<repo_name>/<pr_number>")]
pub async fn fetch_pull_request(
	repo_owner: String,
	repo_name: String,
	pr_number: i32,
	claims: Claims,
	github_client_factory: &State<Arc<GithubClientPatFactory>>,
) -> Result<Json<Response>, HttpApiProblem> {
	let pr_number = GithubPullRequestNumber::from(pr_number as i64);
	let pr = github_client_factory
		.github_service(claims.github_access_token)?
		.pull_request(repo_owner.clone(), repo_name.clone(), pr_number)
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
	Ok(Json(pr))
}
