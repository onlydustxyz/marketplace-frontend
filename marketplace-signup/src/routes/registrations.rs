use std::sync::Arc;

use crate::{
	application::registerer::Registerer,
	domain::errors::RegistrationError,
	infrastructure::{github_client::GitHubClient, starknet_client::StarkNetClient},
};
use http_api_problem::{HttpApiProblem, StatusCode};
use log::{error, info, warn};
use rocket::{serde::json::Json, State};
use rocket_okapi::openapi;

use super::dto::{GithubUserRegistrationRequest, GithubUserRegistrationResponse};

#[openapi(tag = "Registrations")]
#[post("/registrations/github", format = "json", data = "<registration>")]
pub async fn register_github_user(
	registration: Json<GithubUserRegistrationRequest<'_>>,
	github_starknet_registerer: &State<Arc<dyn Registerer<GitHubClient, StarkNetClient>>>,
) -> Result<Json<GithubUserRegistrationResponse>, HttpApiProblem> {
	let result = github_starknet_registerer
		.register_contributor(
			registration.authorization_code.to_string(),
			registration.account_address.into(),
			registration.signed_data.into(),
		)
		.await;

	let transaction_hash = match result {
		Ok(transaction_hash) => transaction_hash,
		Err(e) => match e {
			RegistrationError::Authentication(e) => {
				warn!(
					"Failed to get new GitHub access token from code {}. Error: {:?}",
					registration.authorization_code, e
				);
				return Err(HttpApiProblem::new(StatusCode::UNAUTHORIZED)
					.title("Invalid GitHub code")
					.detail(format!(
						"Failed to get new GitHub access token from code {}",
						registration.authorization_code
					)));
			},
			RegistrationError::Identification(e) => {
				error!("Failed to get GitHub user id. Error: {:?}", e);
				return Err(HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("GitHub GET /user failure")
					.detail("Failed to get GitHub user id"));
			},
			RegistrationError::Signature(e) => {
				warn!(
					"Signed data has an invalid signature for account {}. Error: {:?}",
					registration.account_address, e
				);
				return Err(HttpApiProblem::new(StatusCode::UNAUTHORIZED)
					.title("Invalid signature")
					.detail(format!(
						"Signed data has an invalid signature for account {}",
						registration.account_address
					)));
			},
			RegistrationError::Registry(e) => {
				error!(
					"Failed to register account {} in the registry contract. Error: {:?}",
					registration.account_address, e
				);
				return Err(HttpApiProblem::new(StatusCode::INTERNAL_SERVER_ERROR)
					.title("Transaction error")
					.detail(format!(
						"Failed to register account {} in the registry contract",
						registration.account_address
					)));
			},
		},
	};

	info!(
		"successfully registered user with account {}",
		registration.account_address
	);
	Ok(Json(GithubUserRegistrationResponse {
		transaction_hash: transaction_hash.into(),
	}))
}
