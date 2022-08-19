#[cfg(test)]
mod tests;

use http_api_problem::HttpApiProblem;
use itertools::Itertools;
use marketplace_backend::{domain::ApplicationRepository, dto};
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;
use std::sync::Arc;

use crate::routes::{to_http_api_problem::ToHttpApiProblem, u256::U256Param};

#[openapi(tag = "Applications")]
#[get("/applications?<contributor_id>")]
pub async fn list_contributor_applications(
	contributor_id: Option<U256Param>,
	application_repository: &State<Arc<dyn ApplicationRepository>>,
) -> Result<Json<Vec<dto::Application>>, HttpApiProblem> {
	let contributor_id = contributor_id.map(|id| id.into());

	let applications = application_repository
		.list_by_contributor(contributor_id)
		.map_err(|e| e.to_http_api_problem())?;

	Ok(Json(applications.into_iter().map_into().collect()))
}
