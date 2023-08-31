use std::sync::Arc;

use common_domain::GithubIssueNumber;
use http_api_problem::{HttpApiProblem, StatusCode};
use olog::{error, IntoField};
use rocket::{serde::json::Json, State};

use crate::presentation::http::{
	github_client_pat_factory::GithubClientPatFactory, routes::issues::dto::Response,
};

#[get("/issues/<repo_owner>/<repo_name>/<issue_number>")]
pub async fn fetch_issue_by_repo_owner_name_issue_number(
	repo_owner: String,
	repo_name: String,
	issue_number: i32,
	github_client_factory: &State<Arc<GithubClientPatFactory>>,
) -> Result<Json<Response>, HttpApiProblem> {
	let issue_number = GithubIssueNumber::from(issue_number as i64);

	let issue = github_client_factory
		.github_service()?
		.issue(repo_owner.clone(), repo_name.clone(), issue_number)
		.await
		.map(Into::into)
		.map_err(|e| {
			let error_message = format!(
				"Failed to fetch issue for repo_owner {:} and repo_name {:} and issue_number {:}",
				repo_owner.clone(),
				repo_name.clone(),
				issue_number.clone()
			);
			error!(error = e.to_field(), "{error_message}");
			HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title(error_message)
				.detail(e.to_string())
		})?;
	Ok(Json(issue))
}
