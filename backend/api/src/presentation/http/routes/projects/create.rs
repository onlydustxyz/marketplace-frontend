use common_domain::{DomainError, ProjectId, ProjectVisibility};
use http_api_problem::{HttpApiProblem, StatusCode};
use presentation::http::guards::ApiKey;
use rocket::{serde::json::Json, State};
use rusty_money::Money;
use serde::{Deserialize, Serialize};
use url::Url;

use crate::application;

#[derive(Debug, Serialize, Deserialize)]
pub struct Response {
	pub project_id: ProjectId,
}

#[derive(Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Request {
	name: String,
	short_description: String,
	long_description: String,
	telegram_link: Option<Url>,
	logo_url: Option<Url>,
	initial_budget: Option<i32>,
	hiring: Option<bool>,
	rank: Option<i32>,
	visibility: Option<ProjectVisibility>,
}

#[post("/projects", data = "<request>", format = "application/json")]
pub async fn create_project(
	_api_key: ApiKey,
	request: Json<Request>,
	create_project_usecase: &State<application::project::create::Usecase>,
) -> Result<Json<Response>, HttpApiProblem> {
	let project_id = create_project_usecase
		.create(
			request.name.clone().try_into().map_err(|e: DomainError| {
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title("Unable to read project_name")
					.detail(e.to_string())
			})?,
			request.short_description.clone().try_into().map_err(|e: DomainError| {
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title("Unable to read short_description")
					.detail(e.to_string())
			})?,
			request.long_description.clone().try_into().map_err(|e: DomainError| {
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title("Unable to read long_description")
					.detail(e.to_string())
			})?,
			request.telegram_link.clone(),
			request.logo_url.clone(),
			request.initial_budget.map(|initial_budget| {
				Money::from_major(initial_budget as i64, rusty_money::crypto::USDC).into()
			}),
			request.hiring.unwrap_or_default(),
			request.rank.unwrap_or_default(),
			request.visibility.clone().unwrap_or_default(),
		)
		.await
		.map_err(|e| {
			{
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Unable to process create_project request")
					.detail(e.to_string())
			}
		})?;
	Ok(Json(Response { project_id }))
}
