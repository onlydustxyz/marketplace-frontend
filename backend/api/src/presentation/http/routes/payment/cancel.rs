use domain::{AggregateRepository, Payment};
use http_api_problem::{HttpApiProblem, StatusCode};
use presentation::http::guards::{ApiKey, Claims, Role};
use rocket::{serde::json::Json, State};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{application, domain::permissions::IntoPermission};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
	pub command_id: Uuid,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
	pub project_id: Uuid,
	pub payment_id: Uuid,
}

#[delete("/payments", data = "<request>", format = "application/json")]
pub async fn cancel_payment(
	_api_key: ApiKey,
	request: Json<Request>,
	claims: Option<Claims>,
	role: Role,
	cancel_payment_usecase: &State<application::payment::cancel::Usecase>,
	payment_repository: &State<AggregateRepository<Payment>>,
) -> Result<Json<Response>, HttpApiProblem> {
	let Request {
		project_id,
		payment_id,
	} = request.into_inner();

	if !role
		.to_permissions((*payment_repository).clone())
		.can_cancel_payments_of_project(&project_id.into())
	{
		return Err(HttpApiProblem::new(StatusCode::UNAUTHORIZED)
			.title("Unauthorized operation on project")
			.detail(format!(
				"User {} needs project lead role to cancel a payment request on project {}",
				claims.map(|c| c.user_id).unwrap_or_default(),
				project_id
			)));
	}

	let command_id = cancel_payment_usecase
		.cancel(&project_id.into(), &payment_id.into())
		.await
		.map_err(|e| {
			{
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Unable to process cancel_payment request")
					.detail(e.to_string())
			}
		})?;

	Ok(Json(Response {
		command_id: command_id.into(),
	}))
}
