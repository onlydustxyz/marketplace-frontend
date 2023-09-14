use common_domain::ProjectId;
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
	pub project_id: ProjectId,
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
) -> Result<(), HttpApiProblem> {
	let (amount, sponsor_id) = request.into_inner().try_into()?;
	usecase
		.allocate(project_id.into(), amount, sponsor_id)
		.await
		.map_err(Into::<Error>::into)?;

	Ok(())
}
