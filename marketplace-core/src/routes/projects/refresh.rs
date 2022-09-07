use crate::{
	routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem},
	RefreshProjects,
};
use http_api_problem::HttpApiProblem;
use marketplace_core::application::RefreshProjectsMembers;
use rocket::{http::Status, State};
use rocket_okapi::openapi;

#[openapi(tag = "Projects")]
#[post("/projects/refresh")]
pub async fn refresh_projects(
	_api_key: ApiKey,
	refresh_projects_usecase: &State<RefreshProjects>,
	refresh_projects_members_usecase: &State<RefreshProjectsMembers>,
) -> Result<Status, HttpApiProblem> {
	refresh_projects_usecase
		.refresh_projection_from_events()
		.await
		.map_err(|e| e.to_http_api_problem())?;

	refresh_projects_members_usecase
		.refresh_projection_from_events()
		.await
		.map_err(|e| e.to_http_api_problem())?;

	Ok(Status::Ok)
}
