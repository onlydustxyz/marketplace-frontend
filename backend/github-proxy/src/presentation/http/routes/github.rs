use std::{collections::HashMap, path::PathBuf};

use olog::error;
use presentation::http::guards::{ApiKey, ApiKeyGuard};
use rocket::http::Status;

use crate::presentation::http::dto::{Headers, Params, Response};

#[derive(Default)]
pub struct GithubApiKey;

impl ApiKey for GithubApiKey {
	fn name() -> &'static str {
		"github"
	}
}

#[get("/github/<path..>?<params..>")]
pub async fn get(
	_api_key: ApiKeyGuard<GithubApiKey>,
	headers: Headers,
	path: PathBuf,
	params: HashMap<String, String>,
) -> Result<Response, Status> {
	let params: Params = params.into();
	let request = reqwest::Client::new()
		.get(format!("https://api.github.com/{}{params}", path.display()))
		.headers(headers.into());

	let response = request.send().await.map_err(|e| {
		error!(
			error = e.to_string(),
			"Failed to perform request to Github API"
		);
		Status::InternalServerError
	})?;

	Response::from_reqwest_response(response).await.map_err(|e| {
		error!(
			error = e.to_string(),
			"Failed to decode Github API response"
		);
		Status::InternalServerError
	})
}
