use http_api_problem::HttpApiProblem;
use marketplace_core::application::AcceptApplicationUsecase;
use marketplace_domain::ParseHexPrefixedStringError;
use rocket::{response::status, State};
use rocket_okapi::openapi;

use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem, u256::U256Param};

#[openapi(tag = "Contributions")]
#[put("/applications/<contribution_id>/<contributor_id>/accept")]
pub async fn accept_application(
	_api_key: ApiKey,
	contribution_id: String,
	contributor_id: U256Param,
	usecase: &State<Box<dyn AcceptApplicationUsecase>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	let contribution_id = contribution_id
		.parse()
		.map_err(|e: ParseHexPrefixedStringError| e.to_http_api_problem())?;
	let contributor_id = contributor_id.into();

	usecase
		.accept_application(&contribution_id, &contributor_id)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	// TODO after action queue is removed:
	// return the hash of the on-chain transaction containing the call
	Ok(status::Accepted(None))
}
