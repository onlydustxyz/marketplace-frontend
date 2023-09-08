use diesel_json::Json as DbJson;
use domain::blockchain::evm;
use http_api_problem::HttpApiProblem;
use olog::IntoField;
use presentation::http::guards::{ApiKey, Claims};
use reqwest::StatusCode;
use rocket::serde::json::Json;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::{
	application::user::update_payout_info::*,
	models::*,
	presentation::http::dto::{self, PayoutSettings},
};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
	pub user_id: Uuid,
}

#[derive(Debug, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub struct Request {
	location: Option<dto::identity::Location>,
	identity: Option<dto::Identity>,
	payout_settings: Option<dto::PayoutSettings>,
}

#[post(
	"/users/profile/payout_info",
	data = "<request>",
	format = "application/json"
)]
pub async fn update_user_payout_info(
	_api_key: ApiKey,
	claims: Claims,
	request: Json<Request>,
	usecase: Usecase,
) -> Result<Json<Response>, HttpApiProblem> {
	let request = request.into_inner();
	let caller_id = claims.user_id.into();

	let identity = match request.identity.clone() {
		Some(identity) => {
			let identity = Identity::try_from(identity).map_err(|e| {
				HttpApiProblem::new(StatusCode::BAD_REQUEST)
					.title("Invalid identity")
					.detail(e.to_string())
			})?;
			Some(DbJson(identity))
		},
		None => None,
	};

	let PayoutSettings {
		bank_account,
		eth_name,
		eth_address,
		optimism_address,
		aptos_address,
		usd_preferred_method,
		starknet_address,
	} = request.payout_settings.unwrap_or_default();

	let user_payout_info = UserPayoutInfo {
		user_id: caller_id,
		identity,
		location: request.location.map(|location| DbJson(location.into())),
		usd_preferred_method: usd_preferred_method.map(Into::into),
	};

	if eth_name.is_some() && eth_address.is_some() {
		return Err(HttpApiProblem::new(StatusCode::BAD_REQUEST)
			.title("Bad request")
			.detail("ethereum address and ens are exclusive"));
	}

	usecase
		.update_user_payout_info(
			user_payout_info,
			bank_account.map(|a| (caller_id, a).into()),
			eth_name.map(evm::Wallet::Name).or(eth_address.map(evm::Wallet::Address)),
			optimism_address,
			aptos_address,
			starknet_address,
		)
		.await
		.map_err(|e| {
			olog::error!(error = e.to_field(), "Unable to update user payout info");
			HttpApiProblem::new(match e {
				Error::InvalidInput(_) => StatusCode::BAD_REQUEST,
				Error::Repository(_) | Error::Internal(_) => StatusCode::INTERNAL_SERVER_ERROR,
			})
			.title("Unable to update user payout info")
			.detail(e.to_string())
		})?;

	Ok(Json(Response {
		user_id: caller_id.into(),
	}))
}
