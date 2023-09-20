use std::sync::Arc;

use http_api_problem::{HttpApiProblem, StatusCode};
use infrastructure::{database, github};
use olog::{error, IntoField};
use presentation::http::guards::ApiKey;
use rocket::State;

use crate::{
	github_indexer::indexers::{
		self,
		contributors_projector::ContributorsProjector,
		optional::{self, Optional},
		pull_request::ById,
		Indexer,
	},
	models::GithubPullRequest,
};

#[post("/repo/<repo_id>/pull_request/<pr_number>")]
pub async fn index(
	_api_key: ApiKey,
	repo_id: i64,
	pr_number: i64,
	database: &State<Arc<database::Client>>,
	github: &State<Arc<github::Client>>,
) -> Result<(), HttpApiProblem> {
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
	.by_id(github)
	.optional(database);

	indexer.index(&(repo_id.into(), pr_number.into())).await.map_err(|e| {
		let error_message = "Error while indexing Github pull request";
		error!(error = e.to_field(), "{error_message}");
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title(error_message.to_string())
			.detail(e.to_string())
	})?;

	Ok(())
}
