use std::sync::Arc;

use http_api_problem::HttpApiProblem;
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;

use marketplace_domain::{
	ContributionProjectionRepository, ContributorId, ContributorProjectionRepository,
	HexPrefixedString,
};

use crate::{
	dto,
	routes::{
		api_key::ApiKey, hex_prefixed_string::HexPrefixedStringDto,
		to_http_api_problem::ToHttpApiProblem,
	},
};

#[openapi(tag = "Contributions")]
#[get("/contributions?<contributor_account>&<project_id>")]
pub async fn get_contributions(
	contributor_account: Option<HexPrefixedStringDto>,
	project_id: Option<u64>,
	contribution_repository: &State<Arc<dyn ContributionProjectionRepository>>,
	contributor_repository: &State<Arc<dyn ContributorProjectionRepository>>,
	_api_key: ApiKey,
) -> Result<Json<Vec<dto::Contribution>>, HttpApiProblem> {
	let mut filters = vec![];
	if let Some(contributor_account) = contributor_account {
		let contributor_account = ContributorId::from(HexPrefixedString::from(contributor_account));
		filters.push(contributor_account.into())
	}
	if let Some(project_id) = project_id {
		filters.push(project_id.into())
	}

	let contributions =
		contribution_repository.find(&filters).map_err(|e| e.to_http_api_problem())?;
	let contribution_dtos: Vec<dto::Contribution> = contributions
		.into_iter()
		.filter_map(|c| dto::build_contribution_dto(c, contributor_repository))
		.collect();
	Ok(contribution_dtos.into())
}
