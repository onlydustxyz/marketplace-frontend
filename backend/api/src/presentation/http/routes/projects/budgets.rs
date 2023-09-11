use common_domain::ProjectId;
use domain::{currencies, Amount};
use http_api_problem::HttpApiProblem;
use presentation::http::guards::ApiKey;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{application, presentation::http::error::Error};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
	pub project_id: ProjectId,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
	amount: i64,
}

#[put(
	"/projects/<project_id>/budgets",
	data = "<request>",
	format = "application/json"
)]
pub async fn allocate(
	_api_key: ApiKey,
	project_id: Uuid,
	request: Json<Request>,
	usecase: application::budget::allocate::Usecase,
) -> Result<(), HttpApiProblem> {
	let Request { amount } = request.into_inner();

	usecase
		.allocate(
			project_id.into(),
			Amount::from_major(amount, currencies::USD),
		)
		.await
		.map_err(Into::<Error>::into)?;

	Ok(())
}
