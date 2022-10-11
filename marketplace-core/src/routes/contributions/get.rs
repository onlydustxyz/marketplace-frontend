use std::sync::Arc;

use http_api_problem::HttpApiProblem;
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;

use marketplace_domain::{ContributionProjectionRepository, ContributorProjectionRepository};

use crate::{dto, routes::to_http_api_problem::ToHttpApiProblem};

#[openapi(tag = "Contributions")]
#[get("/contributions")]
pub async fn get_contributions(
	contribution_repository: &State<Arc<dyn ContributionProjectionRepository>>,
	contributor_repository: &State<Arc<dyn ContributorProjectionRepository>>,
) -> Result<Json<Vec<dto::Contribution>>, HttpApiProblem> {
	let contributions = contribution_repository.list_all().map_err(|e| e.to_http_api_problem())?;
	let contribution_dtos: Vec<dto::Contribution> = contributions
		.into_iter()
		.filter_map(|c| dto::build_contribution_dto(c, contributor_repository))
		.collect();
	Ok(contribution_dtos.into())
}
