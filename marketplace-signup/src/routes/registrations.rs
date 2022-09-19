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

#[cfg(test)]
mod tests {
	use crate::{
		application::registerer::Registerer,
		domain::{errors::RegistrationError, services::onchain_registry::OnChainRegistry},
		infrastructure::{
			github_client::GitHubClient, starknet_client::StarkNetClient, StarknetSignature,
			StarknetSignedData,
		},
		routes::{self},
	};
	use claim::assert_some_eq;
	use mockall::{mock, predicate::eq};
	use rocket::{
		http::{ContentType, Status},
		local::blocking::Client,
		serde::json::serde_json::json,
	};
	use starknet::macros::felt;

	mock! {
		MyRegisterer {}
		#[async_trait]
		impl Registerer<GitHubClient, StarkNetClient> for MyRegisterer {
			async fn register_contributor(
				&self,
				authorization_code: String,
				account_address: <StarkNetClient as OnChainRegistry>::AccountAddress,
				signed_data: <StarkNetClient as OnChainRegistry>::SignedData,
			) -> Result<<StarkNetClient as OnChainRegistry>::TransactionHash, RegistrationError>;
		}
	}

	#[test]
	fn test_register_github_user() {
		let mut registerer_mock = MockMyRegisterer::new();

		registerer_mock
			.expect_register_contributor()
			.with(
				eq("foo-code".to_string()),
				eq(felt!(
					"0x65f1506b7f974a1355aeebc1314579326c84a029cd8257a91f82384a6a0ace"
				)),
				eq(StarknetSignedData {
					hash: felt!(
						"0x287b943b1934949486006ad63ac0293038b6c818b858b09f8e0a9da12fc4074"
					),
					signature: StarknetSignature {
						r: felt!(
							"0xde4d49b21dd8714eaf5a1b480d8ede84d2230d1763cfe06762d8a117493bcd"
						),
						s: felt!(
							"0x4b61402b98b29a34bd4cba8b5eabae840809914160002385444059f59449a4"
						),
					},
				}),
			)
			.times(1)
			.returning(|_, _, _| Ok(felt!("0x666")));

		let router = routes::router::new(
			Box::new(registerer_mock) as Box<dyn Registerer<GitHubClient, StarkNetClient>>
		);

		let client = Client::tracked(router).expect("valid rocket instance");
		let response = client
			.post(uri!("/registrations/github"))
			.header(ContentType::JSON)
			.body(
				json!({
					"authorization_code": "foo-code",
					"account_address": "0x65f1506b7f974a1355aeebc1314579326c84a029cd8257a91f82384a6a0ace",
					"signed_data": {
						"hash": "0x287b943b1934949486006ad63ac0293038b6c818b858b09f8e0a9da12fc4074",
						"signature": {
							"r": "0xde4d49b21dd8714eaf5a1b480d8ede84d2230d1763cfe06762d8a117493bcd",
							"s": "0x4b61402b98b29a34bd4cba8b5eabae840809914160002385444059f59449a4"
						}
					},
				})
				.to_string(),
			)
			.dispatch();

		assert_eq!(response.status(), Status::Ok);
		let body = response.into_string();
		assert_some_eq!(body, "{\"transaction_hash\":\"0x666\"}".to_string());
	}
}
