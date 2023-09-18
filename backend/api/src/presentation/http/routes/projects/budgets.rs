use domain::BudgetId;
use http_api_problem::HttpApiProblem;
use presentation::http::guards::ApiKey;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{
	application,
	presentation::http::{dto, error::Error},
};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
	pub budget_id: BudgetId,
}

#[put(
	"/projects/<project_id>/budgets",
	data = "<request>",
	format = "application/json"
)]
pub async fn allocate(
	_api_key: ApiKey,
	project_id: Uuid,
	request: Json<dto::Allocation>,
	usecase: application::budget::allocate::Usecase,
) -> Result<Json<Response>, HttpApiProblem> {
	let (amount, sponsor_id) = request.into_inner().try_into()?;

	let budget_id = usecase
		.allocate(project_id.into(), amount, sponsor_id)
		.await
		.map_err(Into::<Error>::into)?;

	Ok(Json(Response { budget_id }))
}
