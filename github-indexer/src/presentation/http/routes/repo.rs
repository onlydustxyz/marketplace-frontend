use std::sync::Arc;

use domain::GithubRepoId;
use http_api_problem::{HttpApiProblem, StatusCode};
use infrastructure::{database, github};
use olog::{error, IntoField};
use presentation::http::guards::ApiKey;
use rocket::State;

use crate::{
	domain::indexers::{
		self,
		optional::{self, Optional},
		Indexer,
	},
	models::GithubRepo,
};

#[post("/repo/<id>")]
pub async fn index(
	_api_key: ApiKey,
	id: i64,
	database: &State<Arc<database::Client>>,
	github: &State<Arc<github::Client>>,
) -> Result<(), HttpApiProblem> {
	let database = (*database).clone();
	let github = (*github).clone();

	let indexer: optional::Indexer<_, _, GithubRepo> =
		indexers::repo::new(github, database.clone(), database.clone(), database.clone())
			.optional(database);

	indexer.index(&GithubRepoId::from(id)).await.map_err(|e| {
		let error_message = "Error while indexing Github repo";
		error!(error = e.to_field(), "{error_message}");
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title(error_message.to_string())
			.detail(e.to_string())
	})?;

	Ok(())
}
