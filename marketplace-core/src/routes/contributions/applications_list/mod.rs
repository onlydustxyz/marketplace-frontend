use crate::{
	dto,
	routes::{
		hex_prefixed_string::HexPrefixedStringDto, to_http_api_problem::ToHttpApiProblem,
		u256::U256Param,
	},
};
use http_api_problem::HttpApiProblem;
use itertools::Itertools;
use marketplace_domain::{
	ApplicationProjection, ApplicationProjectionRepository, ContributorAccountAddress,
};
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;
use std::sync::Arc;

#[derive(Debug)]
struct ContributorIdDynamicParameter(ContributorAccountAddress);

#[openapi(tag = "Contributions")]
#[get("/contributions/<contribution_id>/applications?<contributor_account_address>")]
pub async fn list_applications(
	contribution_id: HexPrefixedStringDto,
	contributor_account_address: Option<U256Param>,
	application_repository: &State<Arc<dyn ApplicationProjectionRepository>>,
) -> Result<Json<Vec<dto::Application>>, HttpApiProblem> {
	let contribution_id = contribution_id.into();
	let contributor_account_address: Option<ContributorAccountAddress> =
		contributor_account_address.map(|id| id.into());

	let applications: Vec<ApplicationProjection> = application_repository
		.list_by_contribution(&contribution_id, contributor_account_address)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(Json(applications.into_iter().map_into().collect()))
}
