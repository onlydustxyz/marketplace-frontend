use super::Context;
use anyhow::anyhow;
use domain::{Amount, BlockchainNetwork, Currency, PaymentReceipt};
use juniper::{graphql_object, FieldResult};
use rusty_money::{crypto, Money};
use uuid::Uuid;

pub struct Mutation;

#[graphql_object(context=Context)]
impl Mutation {
	pub fn new() -> Self {
		Self {}
	}

	pub async fn add_eth_payment_receipt(
		context: &Context,
		request_id: Uuid,
		amount: String,
		currency_code: String,
		recipient_address: String,
		transaction_hash: String,
	) -> FieldResult<Uuid> {
		let currency = crypto::find(&currency_code)
			.ok_or_else(|| anyhow!("Unknown currency code: {currency_code}"))?;
		let amount = Money::from_str(&amount, currency)?;

		let payment_id = context
			.create_payment_usecase
			.create(
				request_id.into(),
				Amount::new(*amount.amount(), Currency::Crypto(currency_code)),
				PaymentReceipt::OnChainPayment {
					network: BlockchainNetwork::Ethereum,
					recipient_address,
					transaction_hash,
				},
			)
			.await?;

		Ok(payment_id.into())
	}

	pub async fn create_project(context: &Context, name: String) -> FieldResult<Uuid> {
		let project_id = context.create_project_usecase.create(name).await?;

		Ok(project_id.into())
	}

	pub async fn assign_project_lead(
		context: &Context,
		project_id: Uuid,
		leader_id: Uuid,
	) -> FieldResult<Uuid> {
		context
			.assign_project_lead_usecase
			.assign_leader(project_id.into(), leader_id.into())
			.await?;

		Ok(project_id)
	}

	pub async fn request_payment(
		context: &Context,
		project_id: Uuid,
		requestor_id: Uuid,
		recipient_id: Uuid,
		amount_in_usd: i32,
		reason: String,
	) -> FieldResult<Uuid> {
		let payment_request_id = context
			.create_payment_request_usecase
			.create(
				project_id.into(),
				requestor_id.into(),
				recipient_id.into(),
				amount_in_usd as u32,
				reason.into(),
			)
			.await?;

		Ok(payment_request_id.into())
	}
}
