#[cfg(test)]
mod tests;

use std::sync::Arc;

use deathnote_contributions_feeder::{
	domain::{Application, ApplicationRepository, ContributionId, ContributorId},
	dto,
};
use http_api_problem::HttpApiProblem;
use itertools::Itertools;
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;
use uuid::Uuid;

use crate::routes::{to_http_api_problem::ToHttpApiProblem, u256::U256Param, uuid::UuidParam};

#[derive(Debug)]
struct ContributorIdDynamicParameter(ContributorId);

#[openapi(tag = "Contributions")]
#[get("/contributions/<contribution_id>/applications?<contributor_id>")]
pub async fn list_applications(
	contribution_id: UuidParam,
	contributor_id: Option<U256Param>,
	application_repository: &State<Arc<dyn ApplicationRepository>>,
) -> Result<Json<Vec<dto::Application>>, HttpApiProblem> {
	let contribution_id: ContributionId = Uuid::from(contribution_id).into();
	let contributor_id: Option<ContributorId> = contributor_id.map(|id| id.into());

	let applications: Vec<Application> = application_repository
		.list_by_contribution(&contribution_id, contributor_id.as_ref())
		.map_err(|e| e.to_http_api_problem())?;

	Ok(Json(applications.into_iter().map_into().collect()))
}
