use std::sync::Arc;

use deathnote_contributions_feeder::domain::{ContactInformation, ContributorService};
use http_api_problem::HttpApiProblem;
use rocket::{response::status, serde::json::Json, State};
use rocket_okapi::openapi;
use schemars::JsonSchema;
use serde::Deserialize;

use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem};

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct PatchContributorDto {
	discord_handle: Option<String>,
}

#[openapi(tag = "Contributors")]
#[patch(
	"/contributors/<contributor_id>",
	format = "application/json",
	data = "<body>"
)]
pub fn patch_contributor(
	_api_key: ApiKey,
	contributor_id: u128,
	body: Json<PatchContributorDto>,
	contributor_service: &State<Arc<dyn ContributorService>>,
) -> Result<status::NoContent, HttpApiProblem> {
	let body = body.into_inner();

	let contact_information = ContactInformation {
		discord_handle: body.discord_handle,
	};
	contributor_service
		.add_contact_information(&contributor_id.into(), contact_information)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::NoContent)
}
