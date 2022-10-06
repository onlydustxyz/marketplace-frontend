use crate::dto;
use http_api_problem::HttpApiProblem;
use marketplace_domain::ContributorProjectionRepository;
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;
use std::sync::Arc;

use crate::routes::{
	hex_prefixed_string::HexPrefixedStringDto, to_http_api_problem::ToHttpApiProblem,
	u256::U256Param,
};

#[openapi(tag = "Contributors")]
#[get("/contributors/<contributor_id>")]
pub async fn get_contributor(
	contributor_id: U256Param,
	contributor_repository: &State<Arc<dyn ContributorProjectionRepository>>,
) -> Result<Json<dto::Contributor>, HttpApiProblem> {
	let contributor_id = contributor_id.into();

	let contributor = contributor_repository
		.find_by_id(&contributor_id)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(Json(contributor.into()))
}

#[openapi(tag = "Contributors")]
#[get("/contributors?<contributor_account>")]
pub async fn get_contributor_by_account(
	contributor_account: HexPrefixedStringDto,
	contributor_repository: &State<Arc<dyn ContributorProjectionRepository>>,
) -> Result<Json<dto::Contributor>, HttpApiProblem> {
	let contributor_account = contributor_account.into();

	let contributor = contributor_repository
		.find_by_account_address(&contributor_account)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(Json(contributor.into()))
}
