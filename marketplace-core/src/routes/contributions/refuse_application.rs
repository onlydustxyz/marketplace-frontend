use http_api_problem::HttpApiProblem;
use marketplace_core::application::RefuseApplicationUsecase;
use marketplace_domain::{ContributorId, ParseHexPrefixedStringError};
use rocket::{response::status, State};
use rocket_okapi::openapi;

use crate::routes::{to_http_api_problem::ToHttpApiProblem, u256::U256Param};

#[openapi(tag = "Contributions")]
#[delete("/contributions/<contribution_id>/applications?<contributor_id>")]
pub async fn refuse_contributor_application(
	contribution_id: String,
	contributor_id: U256Param,
	usecase: &State<Box<dyn RefuseApplicationUsecase>>,
) -> Result<status::NoContent, HttpApiProblem> {
	let contributor_id: ContributorId = contributor_id.into();
	let contribution_id = contribution_id
		.parse()
		.map_err(|e: ParseHexPrefixedStringError| e.to_http_api_problem())?;

	usecase
		.refuse_application(&contribution_id, &contributor_id)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::NoContent)
}
