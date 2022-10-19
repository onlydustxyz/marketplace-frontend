use crate::application::RefuseApplicationUsecase;
use http_api_problem::HttpApiProblem;
use rocket::{response::status, State};
use rocket_okapi::openapi;

use crate::routes::{
	hex_prefixed_string::HexPrefixedStringDto, to_http_api_problem::ToHttpApiProblem,
	u256::U256Param,
};

#[openapi(tag = "Contributions")]
#[delete("/contributions/<contribution_id>/applications?<contributor_account_address>")]
pub async fn refuse_contributor_application(
	contribution_id: HexPrefixedStringDto,
	contributor_account_address: U256Param,
	usecase: &State<Box<dyn RefuseApplicationUsecase>>,
) -> Result<status::NoContent, HttpApiProblem> {
	let contributor_account_address = contributor_account_address.into();
	let contribution_id = contribution_id.into();

	usecase
		.refuse_application(&contribution_id, &contributor_account_address)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	Ok(status::NoContent)
}
