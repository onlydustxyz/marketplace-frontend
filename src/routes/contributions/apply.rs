use std::sync::Arc;

use deathnote_contributions_feeder::{domain::RandomUuidGenerator, infrastructure::database};
use http_api_problem::HttpApiProblem;
use rocket::{response::status, serde::json::Json, State};
use rocket_okapi::openapi;
use schemars::JsonSchema;
use serde::Deserialize;

use crate::routes::{
	api_key::ApiKey, contributor_id::ContributorIdDto, to_http_api_problem::ToHttpApiProblem,
	uuid::UuidParam,
};

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct ApplyDto {
	contributor_id: ContributorIdDto,
}

#[openapi(tag = "Contributions")]
#[post(
	"/contributions/<contribution_id>/applications",
	format = "application/json",
	data = "<body>"
)]
pub async fn apply_to_contribution(
	_api_key: ApiKey,
	contribution_id: UuidParam,
	body: Json<ApplyDto>,
	database: &State<Arc<database::Client>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	let body = body.into_inner();
	let mut uuid_generator = RandomUuidGenerator;

	deathnote_contributions_feeder::application::apply_to_contribution(
		database.as_ref(),
		&mut uuid_generator,
		contribution_id.into(),
		body.contributor_id.into(),
	)
	.map_err(|e| e.to_http_api_problem())?;

	Ok(status::Accepted(None))
}
