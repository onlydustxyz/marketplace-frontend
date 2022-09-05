use crate::{
	routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem},
	RefreshContributions,
};
use http_api_problem::HttpApiProblem;
use rocket::{http::Status, State};
use rocket_okapi::openapi;

#[openapi(tag = "Contributions")]
#[post("/contributions/refresh")]
pub async fn refresh_contributions(
	_api_key: ApiKey,
	usecase: &State<RefreshContributions>,
) -> Result<Status, HttpApiProblem> {
	usecase
		.refresh_projection_from_events()
		.await
		.map_err(|e| e.to_http_api_problem())?;
	Ok(Status::Ok)
}
