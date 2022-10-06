use crate::application::RefuseApplicationUsecase;
use http_api_problem::HttpApiProblem;
use marketplace_domain::ContributorAccountAddress;
use rocket::{response::status, State};
use rocket_okapi::openapi;

use crate::routes::{
	hex_prefixed_string::HexPrefixedStringDto, to_http_api_problem::ToHttpApiProblem,
	u256::U256Param,
};

#[openapi(tag = "Contributions")]
#[delete("/contributions/<contribution_id>/applications?<contributor_id>")]
pub async fn refuse_contributor_application(
	contribution_id: HexPrefixedStringDto,
	contributor_id: U256Param,
	usecase: &State<Box<dyn RefuseApplicationUsecase>>,
) -> Result<status::NoContent, HttpApiProblem> {
	let contributor_id: ContributorAccountAddress = contributor_id.into();
	let contribution_id = contribution_id.into();

	usecase
		.refuse_application(&contribution_id, &contributor_id)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::NoContent)
}
