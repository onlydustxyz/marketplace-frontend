#[cfg(test)]
mod tests;

use crate::application::ApplyToContributionUsecase;
use http_api_problem::HttpApiProblem;
use marketplace_domain::ContributorId;
use rocket::{response::status, serde::json::Json, State};
use rocket_okapi::openapi;
use schemars::JsonSchema;
use serde::Deserialize;

use crate::routes::{
	hex_prefixed_string::HexPrefixedStringDto, to_http_api_problem::ToHttpApiProblem,
	u256::U256Param,
};

#[derive(Deserialize, JsonSchema)]
#[serde(crate = "rocket::serde")]
pub struct ApplyDto {
	contributor_id: U256Param,
}

#[openapi(tag = "Contributions")]
#[post(
	"/contributions/<contribution_id>/applications",
	format = "application/json",
	data = "<body>"
)]
pub async fn apply_to_contribution(
	contribution_id: HexPrefixedStringDto,
	body: Json<ApplyDto>,
	usecase: &State<Box<dyn ApplyToContributionUsecase>>,
) -> Result<status::Created<&str>, HttpApiProblem> {
	let contributor_id: ContributorId = body.into_inner().contributor_id.into();
	let contribution_id = contribution_id.into();

	usecase
		.apply_to_contribution(&contribution_id, &contributor_id)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	let api_url = std::env::var("API_URL").unwrap();
	Ok(status::Created::new(format!(
		"{api_url}/contribution/{contribution_id}/applications/{contributor_id}",
	)))
}
