use crate::presentation::http::dto::{Headers, Params, Response};
use olog::error;
use rocket::http::Status;
use std::path::PathBuf;

// TODO: Add API key
#[get("/github/<path..>?<params..>")]
pub async fn get(headers: Headers, path: PathBuf, params: Params) -> Result<Response, Status> {
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
