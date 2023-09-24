use http_api_problem::HttpApiProblem;
use presentation::http::guards::ApiKey;
use rocket::serde::json::Json;
use serde::{Deserialize, Deserializer};
use url::Url;
use uuid::Uuid;

use crate::{application, presentation::http::dto::NonEmptyTrimmedString};

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
	name: Option<NonEmptyTrimmedString>,
	logo_url: Option<Url>,
	#[serde(default, deserialize_with = "deserialize_some")]
	url: Option<Option<Url>>,
}

#[put(
	"/sponsors/<sponsor_id>",
	data = "<request>",
	format = "application/json"
)]
pub async fn update_sponsor(
	_api_key: ApiKey,
	sponsor_id: Uuid,
	request: Json<Request>,
	usecase: application::sponsor::update::Usecase,
) -> Result<(), HttpApiProblem> {
	let Request {
		name,
		logo_url,
		url,
	} = request.into_inner();

	usecase.update(sponsor_id.into(), name, logo_url, url).await?;

	Ok(())
}

// Any value that is present is considered Some value, including null.
fn deserialize_some<'de, T, D>(deserializer: D) -> Result<Option<T>, D::Error>
where
	T: Deserialize<'de>,
	D: Deserializer<'de>,
{
	Deserialize::deserialize(deserializer).map(Some)
}
