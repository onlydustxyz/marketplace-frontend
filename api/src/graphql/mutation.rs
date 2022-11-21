use super::Context;
use anyhow::anyhow;
use domain::{Amount, BlockchainNetwork, Currency, PaymentReceipt};
use juniper::{graphql_object, FieldResult, GraphQLObject};
use rusty_money::{crypto, Money};
use uuid::Uuid;

pub struct Mutation;

#[derive(GraphQLObject)]
struct PaymentId {
	id: Uuid,
}

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
	) -> FieldResult<PaymentId> {
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
					recipient_address: recipient_address.parse()?,
					transaction_hash: transaction_hash.parse()?,
				},
			)
			.await?;

		Ok(PaymentId {
			id: payment_id.into(),
		})
	}

	pub async fn create_project(context: &Context, name: String) -> FieldResult<Uuid> {
		let project_id = context.create_project_usecase.create(name).await?;

		Ok(project_id.into())
	}
}
