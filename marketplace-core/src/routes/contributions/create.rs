use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem};
use http_api_problem::HttpApiProblem;
use marketplace_core::{application::CreateContributionUsecase, dto::ContributionCreation};
use marketplace_domain::*;
use rocket::{http::Status, serde::json::Json, State};
use rocket_okapi::openapi;
use std::result::Result;

#[openapi(tag = "Contributions")]
#[post("/contributions/github", format = "application/json", data = "<body>")]
pub async fn create_contribution(
	_api_key: ApiKey,
	body: Json<ContributionCreation>,
	usecase: &State<Box<dyn CreateContributionUsecase>>,
) -> Result<Status, HttpApiProblem> {
	let body = body.into_inner();

	let contribution = ContributionProjection {
		project_id: body.project_id(),
		issue_number: body.github_issue_number() as u64,
		gate: body.gate(),
		..Default::default()
	};

	usecase
		.send_creation_request(contribution)
		.await
		.map_err(|e| e.to_http_api_problem())?;

	Ok(Status::Accepted)
}
