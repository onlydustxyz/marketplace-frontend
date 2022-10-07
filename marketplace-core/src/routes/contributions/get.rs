use std::sync::Arc;

use http_api_problem::HttpApiProblem;
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;

use marketplace_domain::{
	ContributionProjectionRepository, ContributorAccountAddress, ContributorProjectionRepository,
	HexPrefixedString,
};

use crate::{
	dto,
	routes::{hex_prefixed_string::HexPrefixedStringDto, to_http_api_problem::ToHttpApiProblem},
};

#[openapi(tag = "Contributions")]
#[get("/contributions?<contributor_account_address>&<project_id>")]
pub async fn get_contributions(
	contributor_account_address: Option<HexPrefixedStringDto>,
	project_id: Option<u64>,
	contribution_repository: &State<Arc<dyn ContributionProjectionRepository>>,
	contributor_repository: &State<Arc<dyn ContributorProjectionRepository>>,
) -> Result<Json<Vec<dto::Contribution>>, HttpApiProblem> {
	let mut filters = vec![];
	if let Some(address) = contributor_account_address {
		let contributor_account_address =
			ContributorAccountAddress::from(HexPrefixedString::from(address));
		filters.push(contributor_account_address.into())
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
