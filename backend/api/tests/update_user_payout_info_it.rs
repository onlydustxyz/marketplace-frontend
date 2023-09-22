mod context;
mod models;

use anyhow::Result;
use api::{
	models::{BankAccount, UserPayoutInfo, Wallet},
	presentation::http::routes::users,
};
use diesel::RunQueryDsl;
use infrastructure::database::{
	enums::{Network, PreferredMethod, WalletType},
	schema::{bank_accounts, user_payout_info, wallets},
};
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

	test.should_update_usd_preferred_method()
		.await
		.expect("should_update_usd_preferred_method");

	test.should_update_bank_address().await.expect("should_update_bank_address");

	test.should_update_eth_address().await.expect("should_update_eth_address");

	test.should_update_eth_name().await.expect("should_update_eth_name");

	test.should_update_optimism_address()
		.await
		.expect("should_update_optimism_address");

	test.should_update_aptos_address().await.expect("should_update_aptos_address");

	test.should_update_starknet_address()
		.await
		.expect("should_update_starknet_address");

	test.should_reject_invalid_identity()
		.await
		.expect("should_reject_invalid_identity");

	test.should_reject_invalid_iban().await.expect("should_reject_invalid_iban");

	test.should_reject_invalid_eth_address()
		.await
		.expect("should_reject_invalid_eth_address");

	test.should_reject_invalid_optimism_address()
		.await
		.expect("should_reject_invalid_optimism_address");

	test.should_reject_invalid_aptos_address()
		.await
		.expect("should_reject_invalid_aptos_address");

	test.should_reject_invalid_starknet_address()
		.await
		.expect("should_reject_invalid_starknet_address");

	test.should_reject_invalid_ens().await.expect("should_reject_invalid_ens");

	test.should_reject_if_both_eth_name_and_ens_are_provided()
		.await
		.expect("should_reject_if_both_eth_name_and_ens_are_provided");
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
		assert_eq!(payout_info.user_id, response.user_id);
		assert_eq!(
			payout_info.identity.unwrap().0,
			api::models::Identity::Person(api::models::PersonIdentity {
				firstname: Some("Anthony".to_string()),
				lastname: Some("BUISSET".to_string())
			})
		);
		assert_eq!(payout_info.location, None);
		assert_eq!(payout_info.usd_preferred_method, None);

		Ok(())
	}

	async fn should_update_company_identity(&mut self) -> Result<()> {
		info!("should_update_company_identity");

		// Given
		let request = json!({
			"identity": {
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
		assert_eq!(payout_info.user_id, response.user_id);
		assert_eq!(
			payout_info.identity.unwrap().0,
			api::models::Identity::Company(api::models::CompanyIdentity {
				owner: Some(api::models::PersonIdentity {
					firstname: Some("Anthony".to_string()),
					lastname: Some("BUISSET".to_string())
				}),
				name: Some("OnlyDust".to_string()),
				identification_number: Some("123456".to_string())
			})
		);
		assert_eq!(payout_info.location, None);
		assert_eq!(payout_info.usd_preferred_method, None);

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
		assert_eq!(payout_info.user_id, response.user_id);
		assert_eq!(payout_info.identity, None);
		assert_eq!(
			payout_info.location.unwrap().0,
			api::models::Location {
				address: Some("34 rue des Bourdonnais".to_string()),
				post_code: Some("75001".to_string()),
				city: Some("Paris".to_string()),
				country: Some("France".to_string())
			}
		);
		assert_eq!(payout_info.usd_preferred_method, None);

		Ok(())
	}

	async fn should_update_usd_preferred_method(&mut self) -> Result<()> {
		info!("should_update_usd_preferred_method");

		// Given
		let request = json!({
			"payoutSettings": {
				"usdPreferredMethod": "CRYPTO"
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
		assert_eq!(payout_info.user_id, response.user_id);
		assert_eq!(payout_info.identity, None);
		assert_eq!(payout_info.location, None);
		assert_eq!(
			payout_info.usd_preferred_method,
			Some(PreferredMethod::Crypto)
		);

		Ok(())
	}

	async fn should_update_bank_address(&mut self) -> Result<()> {
		info!("should_update_bank_address");

		// Given
		let request = json!({
			"payoutSettings": {
				"bankAccount": {
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

		let mut bank_accounts: Vec<BankAccount> =
			bank_accounts::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(bank_accounts.len(), 1);

		let bank_account = bank_accounts.pop().unwrap();
		assert_eq!(bank_account.user_id, response.user_id);
		assert_eq!(bank_account.bic, "DEUTDEFF500");
		assert_eq!(bank_account.iban, "NL80RABO9639906824");

		Ok(())
	}

	async fn should_update_eth_address(&mut self) -> Result<()> {
		info!("should_update_eth_address");

		// Given
		let request = json!({
			"payoutSettings": {
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

		let mut wallets: Vec<Wallet> =
			wallets::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(wallets.len(), 1);

		let wallet = wallets.pop().unwrap();
		assert_eq!(wallet.user_id, response.user_id);
		assert_eq!(wallet.network, Network::Ethereum);
		assert_eq!(wallet.type_, WalletType::Address);
		assert_eq!(wallet.address, "0x690b9a9e9aa1c9db991c7721a92d351db4fac990");

		Ok(())
	}

	async fn should_update_eth_name(&mut self) -> Result<()> {
		info!("should_update_eth_name");

		// Given
		let request = json!({
			"payoutSettings": {
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
		assert_eq!(response.status(), Status::Ok);
		let response: users::update_profile::Response = response.into_json().await.unwrap();

		let mut wallets: Vec<Wallet> =
			wallets::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(wallets.len(), 1);

		let wallet = wallets.pop().unwrap();
		assert_eq!(wallet.user_id, response.user_id);
		assert_eq!(wallet.network, Network::Ethereum);
		assert_eq!(wallet.type_, WalletType::Name);
		assert_eq!(wallet.address, "vitalik.eth");

		Ok(())
	}

	async fn should_update_optimism_address(&mut self) -> Result<()> {
		info!("should_update_optimism_address");

		// Given
		let request = json!({
			"payoutSettings": {
				"optimismAddress": "0x690b9a9e9aa1c9db991c7721a92d351db4fac990",
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

		let mut wallets: Vec<Wallet> =
			wallets::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(wallets.len(), 1);

		let wallet = wallets.pop().unwrap();
		assert_eq!(wallet.user_id, response.user_id);
		assert_eq!(wallet.network, Network::Optimism);
		assert_eq!(wallet.type_, WalletType::Address);
		assert_eq!(wallet.address, "0x690b9a9e9aa1c9db991c7721a92d351db4fac990");

		Ok(())
	}

	async fn should_update_aptos_address(&mut self) -> Result<()> {
		info!("should_update_aptos_address");

		// Given
		let request = json!({
			"payoutSettings": {
				"aptosAddress": "0x83094f69e396645fa3f591573a03ea52c161f56ed9b669c8109ec793c29cac5e",
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

		let mut wallets: Vec<Wallet> =
			wallets::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(wallets.len(), 1);

		let wallet = wallets.pop().unwrap();
		assert_eq!(wallet.user_id, response.user_id);
		assert_eq!(wallet.network, Network::Aptos);
		assert_eq!(wallet.type_, WalletType::Address);
		assert_eq!(
			wallet.address,
			"0x83094f69e396645fa3f591573a03ea52c161f56ed9b669c8109ec793c29cac5e"
		);

		Ok(())
	}

	async fn should_update_starknet_address(&mut self) -> Result<()> {
		info!("should_update_starknet_address");

		// Given
		let request = json!({
			"payoutSettings": {
				"starknetAddress": "0x029efaeb3fadf56f207c8a9d996729956101ffa3e1af645c38c7719d7b2f0710",
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

		let mut wallets: Vec<Wallet> =
			wallets::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(wallets.len(), 1);

		let wallet = wallets.pop().unwrap();
		assert_eq!(wallet.user_id, response.user_id);
		assert_eq!(wallet.network, Network::Starknet);
		assert_eq!(wallet.type_, WalletType::Address);
		assert_eq!(
			wallet.address,
			"0x029efaeb3fadf56f207c8a9d996729956101ffa3e1af645c38c7719d7b2f0710"
		);

		Ok(())
	}

	async fn should_reject_invalid_identity(&mut self) -> Result<()> {
		info!("should_reject_invalid_identity");

		// Given
		let request = json!({
			"identity": {
				"company": {
					"lastname": "BUISSET",
					"firstname": "Anthony"
				},
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
		assert_eq!(response.status(), Status::BadRequest);

		Ok(())
	}

	async fn should_reject_invalid_iban(&mut self) -> Result<()> {
		info!("should_reject_invalid_iban");

		// Given
		let request = json!({
			"payoutSettings": {
				"bankAccount": {
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

	async fn should_reject_invalid_optimism_address(&mut self) -> Result<()> {
		info!("should_reject_invalid_optimism_address");

		// Given
		let request = json!({
			"payoutSettings": {
				"optimismAddress": "0x690b9a9e9aa1c9db991c7721a92d351db4fac0344556",
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

	async fn should_reject_if_both_eth_name_and_ens_are_provided(&mut self) -> Result<()> {
		info!("should_reject_if_both_eth_name_and_ens_are_provided");

		// Given
		let request = json!({
			"payoutSettings": {
				"ethAddress": "0x690b9a9e9aa1c9db991c7721a92d351db4fac990",
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
		assert_eq!(response.status(), Status::BadRequest);

		Ok(())
	}

	async fn should_reject_invalid_aptos_address(&mut self) -> Result<()> {
		info!("should_reject_invalid_aptos_address");

		// Given
		let request = json!({
			"payoutSettings": {
				"aptosAddress": "0x83094f69e396645fa3f591573a03ea52c161f56ed9b669c8109ec793c29cac5edfdf",
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

	async fn should_reject_invalid_starknet_address(&mut self) -> Result<()> {
		info!("should_reject_invalid_starknet_address");

		// Given
		let request = json!({
			"payoutSettings": {
				"starknetAddress": "0xf29efaeb3fadf56f207c8a9d996729956101ffa3e1af645c38c7719d7b2f0710",
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
}
