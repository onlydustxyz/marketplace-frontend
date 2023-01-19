use std::{collections::HashMap, path::PathBuf};

use olog::{debug, error};
use presentation::http::guards::{ApiKey, ApiKeyGuard};
use rocket::{http::Status, State};

use crate::presentation::http::reverse_proxy_dto::{self, Headers, Params, Response};

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
	config: &State<reverse_proxy_dto::Config>,
	headers: Headers,
	path: PathBuf,
	params: HashMap<String, String>,
) -> Result<Response, Status> {
	let params: Params = params.into();
	let url = format!("https://api.github.com/{}{params}", path.display());
	let request = reqwest::Client::new().get(url.clone()).headers(headers.into());

	debug!(url = url, "Forwarding call to Github API");

	let response = request.send().await.map_err(|e| {
		error!(
			error = e.to_string(),
			"Failed to perform request to Github API"
		);
		Status::InternalServerError
	})?;

	Response::from_reqwest_response(response, (*config).clone()).await.map_err(|e| {
		error!(
			error = e.to_string(),
			"Failed to decode Github API response"
		);
		Status::InternalServerError
	})
}
