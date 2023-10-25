use domain::{
	AggregateRepository, CommandId, Currency, GithubUserId, Payment, PaymentId, ProjectId,
};
use http_api_problem::{HttpApiProblem, StatusCode};
use presentation::http::guards::{ApiKey, Claims, Role};
use rocket::{serde::json::Json, State};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};

use crate::{application, domain::permissions::IntoPermission, presentation::http::dto};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
	pub payment_id: PaymentId,
	pub command_id: CommandId,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Request {
	project_id: ProjectId,
	recipient_id: GithubUserId,
	amount: Decimal,
	currency: &'static Currency,
	hours_worked: Option<u32>,
	reason: dto::payment::Reason,
}

#[post("/payments", data = "<request>", format = "application/json")]
pub async fn request_payment(
	_api_key: ApiKey,
	request: Json<Request>,
	claims: Claims,
	role: Role,
	payment_repository: &State<AggregateRepository<Payment>>,
	request_payment_usecase: application::payment::request::Usecase,
) -> Result<Json<Response>, HttpApiProblem> {
	let Request {
		project_id,
		recipient_id,
		amount,
		currency,
		hours_worked,
		reason,
	} = request.into_inner();

	let caller_id = claims.user_id;

	if !role
		.to_permissions((*payment_repository).clone())
		.can_spend_budget_of_project(&project_id)
	{
		return Err(HttpApiProblem::new(StatusCode::UNAUTHORIZED)
			.title("Unauthorized operation on project")
			.detail(format!(
				"User {} needs project lead role to create a payment request on project {}",
				caller_id, project_id
			)));
	}

	let (payment_id, command_id) = request_payment_usecase
		.request(
			project_id,
			caller_id,
			recipient_id,
			amount,
			currency,
			hours_worked,
			reason.try_into()?,
		)
		.await
		.map_err(|e| {
			{
				HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Unable to process request_payment request")
					.detail(e.to_string())
			}
		})?;

	Ok(Json(Response {
		payment_id,
		command_id,
	}))
}
