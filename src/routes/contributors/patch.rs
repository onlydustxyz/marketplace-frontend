use std::error::Error;

use deathnote_contributions_feeder::{
	application::{GetContributorUsecase, NewContributorUsecase, UpdateContributorUsecase},
	domain::Contributor,
};
use http_api_problem::{HttpApiProblem, StatusCode};
use rocket::{response::status, serde::json::Json, State};
use rocket_okapi::openapi;
use schemars::JsonSchema;
use serde::Deserialize;

use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem};

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct PatchContributorDto {
	discord_handle: Option<String>,
	github_handle: Option<String>,
	github_username: Option<String>,
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
	get_usecase: &State<Box<dyn GetContributorUsecase>>,
	new_usecase: &State<Box<dyn NewContributorUsecase>>,
	update_usecase: &State<Box<dyn UpdateContributorUsecase>>,
) -> Result<status::NoContent, HttpApiProblem> {
	// Fetch Contributor
	let contributor = get_usecase.find_by_id(contributor_id.into()).map_err(|error| {
		let mut problem = HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Error while fetching contributor");
		if let Some(s) = error.source() {
			problem.detail = Some(s.to_string());
		}
		problem
	})?;

	// Insert Contributor if not present
	if contributor.is_none() {
		new_usecase
			.insert_contributor(contributor_id.into())
			.map_err(|e| e.to_http_api_problem())?;
	}

	let contributor = get_usecase.find_by_id(contributor_id.into()).map_err(|error| {
		let mut problem = HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Error while fetching contributor");
		if let Some(s) = error.source() {
			problem.detail = Some(s.to_string());
		}
		problem
	})?;

	// Fetch Params
	let body = body.into_inner();
	let discord_handle = body.discord_handle;
	let github_handle = body.github_handle;
	let github_username = body.github_username;

	if let Some(contributor) = contributor {
		let updated_contributor = Contributor {
			id: contributor_id.into(),
			github_handle: if github_handle.is_none() {
				contributor.github_handle
			} else {
				github_handle
			},
			github_username: if github_username.is_none() {
				contributor.github_username
			} else {
				github_username
			},
			discord_handle: if discord_handle.is_none() {
				contributor.discord_handle
			} else {
				discord_handle
			},
		};
		update_usecase
			.update_contributor(contributor_id.into(), updated_contributor)
			.map_err(|e| e.to_http_api_problem())?;
	}

	Ok(status::NoContent)
}
