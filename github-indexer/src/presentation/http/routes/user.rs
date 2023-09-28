use std::sync::Arc;

use domain::GithubUserId;
use http_api_problem::{HttpApiProblem, StatusCode};
use infrastructure::{database, github};
use olog::{error, IntoField};
use presentation::http::guards::ApiKey;
use rocket::{serde::json::Json, State};
use serde::Serialize;

use crate::{
	domain::indexers::{
		self,
		optional::{self, Optional},
		Indexer,
	},
	models::GithubUser,
};

#[derive(Debug, Serialize)]
pub struct Response {
	id: GithubUserId,
}

#[post("/user/<user_id>")]
pub async fn index(
	_api_key: ApiKey,
	user_id: i64,
	database: &State<Arc<database::Client>>,
	github: &State<Arc<github::Client>>,
) -> Result<Json<Response>, HttpApiProblem> {
	let database = (*database).clone();
	let github = (*github).clone();

	let indexer: optional::Indexer<_, _, GithubUser> =
		indexers::user::new(github, database.clone(), database.clone()).optional(database);

	let result = indexer.index(&user_id.into()).await.map_err(|e| {
		let error_message = "Error while indexing Github user";
		error!(error = e.to_field(), "{error_message}");
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title(error_message.to_string())
			.detail(e.to_string())
	})?;

	let id = match result {
		optional::Output::Cached(data) => data.id,
		optional::Output::Fresh(data) =>
			data.ok_or_else(|| {
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR).title("Unable to index user")
			})?
			.id,
	};

	Ok(Json(Response { id }))
}
