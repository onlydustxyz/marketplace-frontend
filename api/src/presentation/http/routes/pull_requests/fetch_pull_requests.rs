use common_domain::GithubPullRequestNumber;
use http_api_problem::{HttpApiProblem, StatusCode};
use olog::{error, IntoField};
use presentation::http::guards::ApiKey;
use rocket::serde::json::Json;

use crate::{
	domain::services::indexer::Service,
	presentation::http::{
		routes::pull_requests::dto::Response, usecases::indexer::Client as IndexerClient,
	},
};

#[get("/pull_requests/<repo_owner>/<repo_name>/<pr_number>")]
pub async fn fetch_pull_request(
	_api_key: ApiKey,
	repo_owner: String,
	repo_name: String,
	pr_number: i32,
	github_indexer_service: IndexerClient,
) -> Result<Json<Response>, HttpApiProblem> {
	let pr_number = GithubPullRequestNumber::from(pr_number as i64);

	let id = github_indexer_service
		.0
		.index_pull_request_by_repo_owner_name(repo_owner.clone(), repo_name.clone(), pr_number)
		.await
		.map_err(|e| {
			let error_message = format!(
				"Failed to fetch pr for repo_owner {repo_owner} and repo_name {repo_name} and pr_number {pr_number}"
			);
			error!(error = e.to_field(), "{error_message}");
			HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title(error_message)
				.detail(e.to_string())
		})?;

	Ok(Json(Response { id: id.into() }))
}
