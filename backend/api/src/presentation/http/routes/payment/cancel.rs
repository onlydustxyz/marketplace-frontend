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

#[delete("/payments/<payment_id>")]
pub async fn cancel_payment(
	_api_key: ApiKey,
	payment_id: Uuid,
	claims: Option<Claims>,
	role: Role,
	usecase: application::payment::cancel::Usecase,
	payment_repository: &State<AggregateRepository<Payment>>,
) -> Result<Json<Response>, HttpApiProblem> {
	let payment_id = payment_id.into();

	if !role
		.to_permissions((*payment_repository).clone())
		.can_cancel_payment(&payment_id)
	{
		return Err(HttpApiProblem::new(StatusCode::UNAUTHORIZED)
			.title("Unauthorized operation on project")
			.detail(format!(
				"User {} needs project lead role to cancel a payment request",
				claims.map(|c| c.user_id).unwrap_or_default(),
			)));
	}

	let command_id = usecase.cancel(&payment_id).await.map_err(|e| {
		HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
			.title("Unable to process cancel_payment request")
			.detail(e.to_string())
	})?;

	Ok(Json(Response {
		command_id: command_id.into(),
	}))
}
