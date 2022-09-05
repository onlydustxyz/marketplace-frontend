use crate::{
	routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem},
	RefreshApplications,
};
use http_api_problem::HttpApiProblem;
use rocket::{http::Status, State};
use rocket_okapi::openapi;

#[openapi(tag = "Applications")]
#[post("/applications/refresh")]
pub async fn refresh_applications(
	_api_key: ApiKey,
	usecase: &State<RefreshApplications>,
) -> Result<Status, HttpApiProblem> {
	usecase
		.refresh_projection_from_events()
		.await
		.map_err(|e| e.to_http_api_problem())?;
	Ok(Status::Ok)
}
