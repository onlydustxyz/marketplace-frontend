use common_domain::ProjectId;
use http_api_problem::HttpApiProblem;
use presentation::http::guards::ApiKey;
use rocket::serde::json::Json;
use rusty_money::Money;
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
			Money::from_major(amount, rusty_money::crypto::USDC).into(),
		)
		.await
		.map_err(Into::<Error>::into)?;

	Ok(())
}
