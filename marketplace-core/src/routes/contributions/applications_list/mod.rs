use std::sync::Arc;

use crate::dto;
use http_api_problem::HttpApiProblem;
use itertools::Itertools;
use marketplace_domain::{
	ApplicationProjection, ApplicationProjectionRepository, ContributorAccount,
};
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;

use crate::routes::{
	hex_prefixed_string::HexPrefixedStringDto, to_http_api_problem::ToHttpApiProblem,
	u256::U256Param,
};

#[derive(Debug)]
struct ContributorIdDynamicParameter(ContributorAccount);

#[openapi(tag = "Contributions")]
#[get("/contributions/<contribution_id>/applications?<contributor_id>")]
pub async fn list_applications(
	contribution_id: HexPrefixedStringDto,
	contributor_id: Option<U256Param>,
	application_repository: &State<Arc<dyn ApplicationProjectionRepository>>,
) -> Result<Json<Vec<dto::Application>>, HttpApiProblem> {
	let contribution_id = contribution_id.into();
	let contributor_id: Option<ContributorAccount> = contributor_id.map(|id| id.into());

	let applications: Vec<ApplicationProjection> = application_repository
		.list_by_contribution(&contribution_id, contributor_id)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(Json(applications.into_iter().map_into().collect()))
}
