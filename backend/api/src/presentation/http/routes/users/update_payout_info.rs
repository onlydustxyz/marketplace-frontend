use http_api_problem::HttpApiProblem;
use presentation::http::guards::Claims;
use reqwest::StatusCode;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{application::user::update_payout_info::*, models::*, presentation::http::dto};

#[derive(Debug, Serialize, Deserialize)]
pub struct Response {
	pub user_id: Uuid,
}

#[derive(Debug, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Request {
	location: Option<dto::identity::Location>,
	identity: Option<dto::Identity>,
	payout_settings: Option<dto::PayoutSettings>,
}

#[post(
	"/api/users/profile/payout_info",
	data = "<request>",
	format = "application/json"
)]
pub async fn update_user_payout_info(
	claims: Claims,
	request: Json<Request>,
	usecase: Usecase,
) -> Result<Json<Response>, HttpApiProblem> {
	let caller_id = claims.user_id;

	let identity = match request.identity.clone() {
		Some(identity_value) => Some(Identity::try_from(identity_value).map_err(|e| {
			HttpApiProblem::new(StatusCode::BAD_REQUEST)
				.title("Invalid identity")
				.detail(e.to_string())
		})?),
		None => None,
	};

	let payout_settings = match request.payout_settings.clone() {
		Some(payout_settings) => Some(PayoutSettings::try_from(payout_settings).map_err(|e| {
			HttpApiProblem::new(StatusCode::BAD_REQUEST)
				.title("Invalid payout settings")
				.detail(e.to_string())
		})?),
		None => None,
	};

	usecase
		.update_user_payout_info(
			caller_id.into(),
			identity,
			request.location.clone().map(Into::into),
			payout_settings,
		)
		.await
		.map_err(|e| {
			HttpApiProblem::new(match e {
				Error::InvalidInput(_) => StatusCode::BAD_REQUEST,
				Error::Repository(_) | Error::Internal(_) => StatusCode::INTERNAL_SERVER_ERROR,
			})
			.title("Unable to update user payout info")
			.detail(e.to_string())
		})?;

	Ok(Json(Response { user_id: caller_id }))
}
