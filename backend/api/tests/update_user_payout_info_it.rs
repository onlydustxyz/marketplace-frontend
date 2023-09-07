mod context;
mod models;

use anyhow::Result;
use api::{models::UserPayoutInfo, presentation::http::routes::users};
use diesel::RunQueryDsl;
use domain::blockchain::*;
use infrastructure::database::schema::user_payout_info;
use olog::info;
use rocket::{
	http::{ContentType, Header, Status},
	serde::json::json,
};
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::context::{
	docker,
	utils::{api_key_header, jwt},
	Context,
};

#[macro_use]
extern crate diesel;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn user_profile_updated(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_update_the_caller_info()
		.await
		.expect("should_update_the_caller_info");

	test.should_update_person_identity()
		.await
		.expect("should_update_person_identity");

	test.should_update_company_identity()
		.await
		.expect("should_update_company_identity");

	test.should_update_location().await.expect("should_update_location");

	test.should_update_bank_address().await.expect("should_update_bank_address");

	test.should_update_eth_address().await.expect("should_update_eth_address");

	test.should_update_eth_name().await.expect("should_update_eth_name");

	test.should_reject_invalid_identity()
		.await
		.expect("should_reject_invalid_identity");

	test.should_reject_invalid_iban().await.expect("should_reject_invalid_iban");

	test.should_reject_invalid_eth_address()
		.await
		.expect("should_reject_invalid_eth_address");

	test.should_reject_invalid_ens().await.expect("should_reject_invalid_ens");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_update_the_caller_info(&mut self) -> Result<()> {
		info!("should_update_the_caller_info");

		// Given
		let request = json!({});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let response: users::update_profile::Response = response.into_json().await.unwrap();

		let user_id = response.user_id;
		assert_eq!(
			user_id,
			"9b7effeb-963f-4ac4-be74-d735501925ed".parse().unwrap()
		);

		Ok(())
	}

	async fn should_update_person_identity(&mut self) -> Result<()> {
		info!("should_update_person_identity");

		// Given
		let request = json!({
			"identity": {
				"type": "PERSON",
				"person": {
					"lastname": "BUISSET",
					"firstname": "Anthony"
				}
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let response: users::update_profile::Response = response.into_json().await.unwrap();

		let mut payout_info: Vec<UserPayoutInfo> =
			user_payout_info::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(payout_info.len(), 1);

		let payout_info = payout_info.pop().unwrap();
		assert_eq!(payout_info.user_id, response.user_id.into());
		assert_eq!(
			payout_info.identity,
			Some(api::models::Identity::Person(api::models::PersonIdentity {
				firstname: Some("Anthony".to_string()),
				lastname: Some("BUISSET".to_string())
			}))
		);
		assert_eq!(payout_info.location, None);
		assert_eq!(payout_info.payout_settings, None);

		Ok(())
	}

	async fn should_update_company_identity(&mut self) -> Result<()> {
		info!("should_update_company_identity");

		// Given
		let request = json!({
			"identity": {
				"type": "COMPANY",
				"company": {
					"owner": {
						"lastname": "BUISSET",
						"firstname": "Anthony"
					},
					"name": "OnlyDust",
					"identificationNumber": "123456"
				}
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let response: users::update_profile::Response = response.into_json().await.unwrap();

		let mut payout_info: Vec<UserPayoutInfo> =
			user_payout_info::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(payout_info.len(), 1);

		let payout_info = payout_info.pop().unwrap();
		assert_eq!(payout_info.user_id, response.user_id.into());
		assert_eq!(
			payout_info.identity,
			Some(api::models::Identity::Company(
				api::models::CompanyIdentity {
					owner: Some(api::models::PersonIdentity {
						firstname: Some("Anthony".to_string()),
						lastname: Some("BUISSET".to_string())
					}),
					name: Some("OnlyDust".to_string()),
					identification_number: Some("123456".to_string())
				}
			))
		);
		assert_eq!(payout_info.location, None);
		assert_eq!(payout_info.payout_settings, None);

		Ok(())
	}

	async fn should_update_location(&mut self) -> Result<()> {
		info!("should_update_location");

		// Given
		let request = json!({
			"location": {
				"address": "34 rue des Bourdonnais",
				"postCode": "75001",
				"city": "Paris",
				"country": "France",
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let response: users::update_profile::Response = response.into_json().await.unwrap();

		let mut payout_info: Vec<UserPayoutInfo> =
			user_payout_info::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(payout_info.len(), 1);

		let payout_info = payout_info.pop().unwrap();
		assert_eq!(payout_info.user_id, response.user_id.into());
		assert_eq!(payout_info.identity, None);
		assert_eq!(
			payout_info.location,
			Some(api::models::Location {
				address: Some("34 rue des Bourdonnais".to_string()),
				post_code: Some("75001".to_string()),
				city: Some("Paris".to_string()),
				country: Some("France".to_string())
			})
		);
		assert_eq!(payout_info.payout_settings, None);

		Ok(())
	}

	async fn should_update_bank_address(&mut self) -> Result<()> {
		info!("should_update_bank_address");

		// Given
		let request = json!({
			"payoutSettings": {
				"type": "BANK_ADDRESS",
				"bankAddress": {
					"BIC": "DEUTDEFF500",
					"IBAN": "NL80RABO9639906824"
				},
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let response: users::update_profile::Response = response.into_json().await.unwrap();

		let mut payout_info: Vec<UserPayoutInfo> =
			user_payout_info::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(payout_info.len(), 1);

		let payout_info = payout_info.pop().unwrap();
		assert_eq!(payout_info.user_id, response.user_id.into());
		assert_eq!(payout_info.identity, None);
		assert_eq!(payout_info.location, None);
		assert_eq!(
			payout_info.payout_settings,
			Some(api::models::PayoutSettings::WireTransfer(
				api::models::BankAddress {
					BIC: "DEUTDEFF500".to_string(),
					IBAN: "NL80RABO9639906824".parse().unwrap()
				}
			))
		);

		Ok(())
	}

	async fn should_update_eth_address(&mut self) -> Result<()> {
		info!("should_update_eth_address");

		// Given
		let request = json!({
			"payoutSettings": {
				"type": "ETHEREUM_ADDRESS",
				"ethAddress": "0x690b9a9e9aa1c9db991c7721a92d351db4fac990",
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let response: users::update_profile::Response = response.into_json().await.unwrap();

		let mut payout_info: Vec<UserPayoutInfo> =
			user_payout_info::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(payout_info.len(), 1);

		let payout_info = payout_info.pop().unwrap();
		assert_eq!(payout_info.user_id, response.user_id.into());
		assert_eq!(payout_info.identity, None);
		assert_eq!(payout_info.location, None);
		assert_eq!(
			payout_info.payout_settings,
			Some(api::models::PayoutSettings::EthTransfer(
				ethereum::Wallet::Address(
					"0x690b9a9e9aa1c9db991c7721a92d351db4fac990".parse().unwrap()
				)
			))
		);

		Ok(())
	}

	async fn should_update_eth_name(&mut self) -> Result<()> {
		info!("should_update_eth_name");

		// Given
		let request = json!({
			"payoutSettings": {
				"type": "ETHEREUM_NAME",
				"ethName": "vitalik.eth",
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::Ok,
			"{:?}",
			response.into_string().await
		);
		let response: users::update_profile::Response = response.into_json().await.unwrap();

		let mut payout_info: Vec<UserPayoutInfo> =
			user_payout_info::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(payout_info.len(), 1);

		let payout_info = payout_info.pop().unwrap();
		assert_eq!(payout_info.user_id, response.user_id.into());
		assert_eq!(payout_info.identity, None);
		assert_eq!(payout_info.location, None);
		assert_eq!(
			payout_info.payout_settings,
			Some(api::models::PayoutSettings::EthTransfer(
				ethereum::Wallet::Name(ethereum::Name::new("vitalik.eth".to_string()))
			))
		);

		Ok(())
	}

	async fn should_reject_invalid_identity(&mut self) -> Result<()> {
		info!("should_reject_invalid_identity");

		// Given
		let request = json!({
			"identity": {
				"type": "PERSON",
				"company": {
					"lastname": "BUISSET",
					"firstname": "Anthony"
				}
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::BadRequest);

		Ok(())
	}

	async fn should_reject_invalid_iban(&mut self) -> Result<()> {
		info!("should_reject_invalid_iban");

		// Given
		let request = json!({
			"payoutSettings": {
				"type": "BANK_ADDRESS",
				"bankAddress": {
					"BIC": "DEUTDEFF500",
					"IBAN": "NL80RABO9639906"
				},
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::UnprocessableEntity);

		Ok(())
	}

	async fn should_reject_invalid_eth_address(&mut self) -> Result<()> {
		info!("should_reject_invalid_eth_address");

		// Given
		let request = json!({
			"payoutSettings": {
				"type": "ETHEREUM_ADDRESS",
				"ethAddress": "0x690b9a9e9aa1c9db991c7721a92d351db4fac0344556",
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::UnprocessableEntity);

		Ok(())
	}

	async fn should_reject_invalid_ens(&mut self) -> Result<()> {
		info!("should_reject_invalid_ens");

		// Given
		let request = json!({
			"payoutSettings": {
				"type": "ETHEREUM_NAME",
				"ethName": "nonexisting.eth",
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile/payout_info")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::BadRequest);

		Ok(())
	}
}
