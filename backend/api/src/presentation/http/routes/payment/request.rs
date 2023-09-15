use domain::{AggregateRootRepository, Project};
use http_api_problem::{HttpApiProblem, StatusCode};
use presentation::http::guards::{ApiKey, Claims, Role};
use rocket::{serde::json::Json, State};
use rust_decimal::prelude::ToPrimitive;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{application, domain::permissions::IntoPermission, presentation::http::dto};

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
	project_id: Uuid,
	recipient_id: u64,
	amount_in_usd: u32,
	hours_worked: u32,
	reason: dto::payment::Reason,
}

#[post("/payments", data = "<request>", format = "application/json")]
pub async fn request_payment(
	_api_key: ApiKey,
	request: Json<Request>,
	claims: Claims,
	role: Role,
	project_repository: &State<AggregateRootRepository<Project>>,
	request_payment_usecase: application::payment::request::Usecase,
) -> Result<Json<Response>, HttpApiProblem> {
	let Request {
		project_id,
		recipient_id,
		amount_in_usd,
		hours_worked,
		reason,
	} = request.into_inner();

	let caller_id = claims.user_id;

	if !role
		.to_permissions((*project_repository).clone())
		.can_spend_budget_of_project(&project_id.into())
	{
		return Err(HttpApiProblem::new(StatusCode::UNAUTHORIZED)
			.title("Unauthorized operation on project")
			.detail(format!(
				"User {} needs project lead role to create a payment request on project {}",
				caller_id, project_id
			)));
	}

	let (project, budget, payment, command_id) = request_payment_usecase
		.request(
			project_id.into(),
			caller_id.into(),
			recipient_id.into(),
			amount_in_usd,
			hours_worked,
			reason.try_into()?,
		)
		.await
		.map_err(|e| {
			{
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Unable to process create_project request")
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
