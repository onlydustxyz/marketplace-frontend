use crate::dto;
use http_api_problem::HttpApiProblem;
use itertools::Itertools;
use marketplace_domain::ApplicationProjectionRepository;
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;
use std::sync::Arc;

use crate::routes::{to_http_api_problem::ToHttpApiProblem, u256::U256Param};

#[openapi(tag = "Applications")]
#[get("/applications?<contributor_account_address>")]
pub async fn list_contributor_applications(
	contributor_account_address: Option<U256Param>,
	application_repository: &State<Arc<dyn ApplicationProjectionRepository>>,
) -> Result<Json<Vec<dto::Application>>, HttpApiProblem> {
	let contributor_account_address = contributor_account_address.map(Into::into);

	let applications = application_repository
		.list_by_contributor(contributor_account_address)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(Json(applications.into_iter().map_into().collect()))
}
