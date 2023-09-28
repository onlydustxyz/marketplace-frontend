use std::sync::Arc;

use domain::GithubPullRequestId;
use http_api_problem::{HttpApiProblem, StatusCode};
use infrastructure::{database, github};
use olog::{error, IntoField};
use presentation::http::guards::ApiKey;
use rocket::{serde::json::Json, State};
use serde::Serialize;

use crate::{
	domain::indexers::{
		self,
		contributors_projector::ContributorsProjector,
		optional::{self, Optional},
		pull_request::{ByRepoId, ByRepoOwnerName},
		Indexer,
	},
	models::github_pull_requests::Inner as GithubPullRequest,
};

#[derive(Debug, Serialize)]
pub struct Response {
	id: GithubPullRequestId,
}

#[post("/repo/<repo_id>/pull_request/<pr_number>")]
pub async fn index_by_repo_id(
	_api_key: ApiKey,
	repo_id: i64,
	pr_number: i64,
	database: &State<Arc<database::Client>>,
	github: &State<Arc<github::Client>>,
) -> Result<Json<Response>, HttpApiProblem> {
	let database = (*database).clone();
	let github = (*github).clone();

	let indexer: optional::Indexer<_, _, GithubPullRequest> = indexers::pull_request::new(
		github.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		ContributorsProjector::new(
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
		),
	)
	.by_repo_id(github)
	.optional(database);

	let result = indexer.index(&(repo_id.into(), pr_number.into())).await.map_err(|e| {
		let error_message = "Error while indexing Github pull request";
		error!(error = e.to_field(), "{error_message}");
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title(error_message.to_string())
			.detail(e.to_string())
	})?;

	let id = match result {
		optional::Output::Cached(data) => data.id,
		optional::Output::Fresh(data) => data.map(|pr| pr.inner.id).ok_or_else(|| {
			HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title("Unable to index pull request")
		})?,
	};

	Ok(Json(Response { id }))
}

#[post("/repo/<repo_owner>/<repo_name>/pull_request/<pr_number>")]
pub async fn index_by_repo_owner_name(
	_api_key: ApiKey,
	repo_owner: String,
	repo_name: String,
	pr_number: i64,
	database: &State<Arc<database::Client>>,
	github: &State<Arc<github::Client>>,
) -> Result<Json<Response>, HttpApiProblem> {
	let database = (*database).clone();
	let github = (*github).clone();

	let indexer: optional::Indexer<_, _, GithubPullRequest> = indexers::pull_request::new(
		github.clone(),
		database.clone(),
		database.clone(),
		database.clone(),
		ContributorsProjector::new(
			database.clone(),
			database.clone(),
			database.clone(),
			database.clone(),
		),
	)
	.by_repo_owner_name(github)
	.optional(database);

	let result = indexer.index(&(repo_owner, repo_name, pr_number.into())).await.map_err(|e| {
		let error_message = "Error while indexing Github pull request";
		error!(error = e.to_field(), "{error_message}");
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title(error_message.to_string())
			.detail(e.to_string())
	})?;

	let id = match result {
		optional::Output::Cached(data) => data.id,
		optional::Output::Fresh(data) => data.map(|pr| pr.inner.id).ok_or_else(|| {
			HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title("Unable to index pull request")
		})?,
	};

	Ok(Json(Response { id }))
}
