#[cfg(test)]
mod tests;

use std::sync::Arc;

use deathnote_contributions_feeder::domain::{
	Application, ApplicationRepository, ContributionId, ContributorId,
};
use http_api_problem::HttpApiProblem;
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;
use uuid::Uuid;

use crate::routes::{
	hex_prefixed_string::HexPrefixedString, to_http_api_problem::ToHttpApiProblem, uuid::UuidParam,
};

#[derive(Debug)]
struct ContributorIdDynamicParameter(ContributorId);

#[openapi(tag = "Contributions")]
#[get("/contributions/<contribution_id>/applications?<contributor_id>")]
pub async fn list_applications(
	contribution_id: UuidParam,
	contributor_id: Option<HexPrefixedString>,
	database: &State<Arc<dyn ApplicationRepository>>,
) -> Result<Json<Vec<Application>>, HttpApiProblem> {
	let contribution_id: ContributionId = Uuid::from(contribution_id).into();
	let contributor_id: Option<ContributorId> =
		contributor_id.map(|id| id.as_unprefixed_str().into());

	let applications = database
		.list_by_contribution(&contribution_id, &contributor_id)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(Json(applications))
}
