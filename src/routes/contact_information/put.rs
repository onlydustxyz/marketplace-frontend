use std::sync::Arc;

use deathnote_contributions_feeder::domain::ContactInformationService;
use http_api_problem::HttpApiProblem;
use rocket::{response::status, serde::json::Json, State};
use rocket_okapi::openapi;
use schemars::JsonSchema;
use serde::Deserialize;

use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem, u256::U256Param};

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct PutContributorDto {
	discord_handle: Option<String>,
}

#[openapi(tag = "Contributors")]
#[put(
	"/contributors/<contributor_id>/contact-information",
	format = "application/json",
	data = "<body>"
)]
pub fn put_contact_information(
	_api_key: ApiKey,
	contributor_id: U256Param,
	body: Json<PutContributorDto>,
	contact_information_service: &State<Arc<dyn ContactInformationService>>,
) -> Result<status::NoContent, HttpApiProblem> {
	let body = body.into_inner();
	let discord_handle = body.discord_handle;

	contact_information_service
		.set_contributor_contact_information(&contributor_id.into(), discord_handle)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::NoContent)
}
