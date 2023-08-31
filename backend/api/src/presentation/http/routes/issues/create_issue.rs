use common_domain::{AggregateRootRepository, Project};
use http_api_problem::HttpApiProblem;
use olog::{error, IntoField};
use presentation::http::guards::{Claims, Role};
use reqwest::StatusCode;
use rocket::{serde::json::Json, State};
use serde::Deserialize;
use uuid::Uuid;

use crate::{
	application, domain::permissions::IntoPermission,
	presentation::http::routes::issues::dto::Response,
};

#[derive(Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Request {
	project_id: Uuid,
	github_repo_id: i32,
	title: String,
	description: String,
}

#[post("/issues", data = "<request>", format = "application/json")]
pub async fn create_and_close_issue(
	claims: Claims,
	request: Json<Request>,
	create_github_issue_usecase: &State<application::dusty_bot::create_and_close_issue::Usecase>,
	project_repository: &State<AggregateRootRepository<Project>>,
) -> Result<Json<Response>, HttpApiProblem> {
	let caller_id = claims.user_id;

	if !Role::from(claims)
		.to_permissions((*project_repository).clone())
		.can_create_github_issue_for_project(&request.project_id.into())
	{
		return Err(HttpApiProblem::new(StatusCode::UNAUTHORIZED)
			.title("Unauthorized operation on issue")
			.detail(format!(
				"User {} needs project lead role to create an issue on project {}",
				caller_id,
				&request.project_id.to_string()
			)));
	}

	let issue = create_github_issue_usecase
		.create_and_close_issue(
			&request.project_id.into(),
			(request.github_repo_id as i64).into(),
			request.title.to_string(),
			request.description.to_string(),
		)
		.await
		.map_err(|e| {
			let error_message = "Internal server error while creating and closing issue";
			error!(error = e.to_field(), "{error_message}");
			HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
				.title(error_message)
				.detail(e.to_string())
		})?;
	Ok(Json(issue.into()))
}
