use domain::{AggregateRootRepository, Project};
use http_api_problem::{HttpApiProblem, StatusCode};
use presentation::http::guards::{ApiKey, Claims, Role};
use rocket::{serde::json::Json, State};
use rust_decimal::prelude::ToPrimitive;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{application, domain::permissions::IntoPermission};

#[derive(Debug, Serialize, Deserialize)]
pub struct Response {
	pub project_id: Uuid,
	pub budget_id: Uuid,
	pub payment_id: Uuid,
	pub command_id: Uuid,
	pub amount: f64,
}

#[derive(Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
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
	project_repository: &State<AggregateRootRepository<Project>>,
) -> Result<Json<Response>, HttpApiProblem> {
	let Request {
		project_id,
		payment_id,
	} = request.into_inner();

	if !role
		.to_permissions((*project_repository).clone())
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

	let (project, budget, payment, command_id) = cancel_payment_usecase
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
		project_id: (*project.id()).into(),
		budget_id: (*budget.id()).into(),
		payment_id: payment.id.into(),
		command_id: command_id.into(),
		amount: payment
			.requested_usd_amount
			.to_f64()
			.ok_or_else(|| olog::error!("Could not format payment amount"))
			.unwrap_or_default(),
	}))
}
