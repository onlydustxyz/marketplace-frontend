#[cfg(test)]
mod tests;

use http_api_problem::HttpApiProblem;
use marketplace_backend::{application::AcceptApplicationUsecase, domain::ApplicationId};
use rocket::{response::status, State};
use rocket_okapi::openapi;

use crate::routes::{api_key::ApiKey, to_http_api_problem::ToHttpApiProblem, uuid::UuidParam};

#[openapi(tag = "Contributions")]
#[put("/applications/<application_id>/accept")]
pub async fn accept_application(
	_api_key: ApiKey,
	application_id: UuidParam,
	usecase: &State<Box<dyn AcceptApplicationUsecase>>,
) -> Result<status::Accepted<()>, HttpApiProblem> {
	let application_id: ApplicationId = (*application_id.as_uuid()).into();

	usecase
		.accept_application(&application_id)
		.map_err(|e| e.to_http_api_problem())?;

	// TODO after action queue is removed:
	// return the hash of the on-chain transaction containing the call
	Ok(status::Accepted(None))
}
