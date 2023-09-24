use domain::sponsor;
use http_api_problem::HttpApiProblem;
use presentation::http::guards::ApiKey;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use url::Url;

use crate::{application, presentation::http::dto::NonEmptyTrimmedString};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
	pub sponsor_id: sponsor::Id,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
	name: NonEmptyTrimmedString,
	logo_url: Url,
	url: Option<Url>,
}

#[post("/sponsors", data = "<request>", format = "application/json")]
pub async fn create_sponsor(
	_api_key: ApiKey,
	request: Json<Request>,
	usecase: application::sponsor::create::Usecase,
) -> Result<Json<Response>, HttpApiProblem> {
	let Request {
		name,
		logo_url,
		url,
	} = request.into_inner();

	let sponsor_id = usecase.create(name, logo_url, url).await?;

	Ok(Json(Response { sponsor_id }))
}
