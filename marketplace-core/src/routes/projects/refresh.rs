use crate::{
	routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem},
	RefreshProjects,
};
use http_api_problem::HttpApiProblem;
use rocket::{http::Status, State};
use rocket_okapi::openapi;

#[openapi(tag = "Projects")]
#[post("/projects/refresh")]
pub async fn refresh_projects(
	_api_key: ApiKey,
	usecase: &State<RefreshProjects>,
) -> Result<Status, HttpApiProblem> {
	usecase
		.refresh_projection_from_events()
		.await
		.map_err(|e| e.to_http_api_problem())?;
	Ok(Status::Ok)
}
