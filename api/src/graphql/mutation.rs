use super::Context;
use domain::{Amount, BlockchainNetwork, Currency, PaymentReceipt};
use juniper::{graphql_object, FieldResult, GraphQLInputObject, GraphQLObject};
use uuid::Uuid;

pub struct Mutation;

#[derive(GraphQLInputObject)]
#[graphql(description = "Receipt data of an ethereum payment")]
struct EthPaymentReceipt {
	recipient_address: String,
	transaction_hash: String,
}

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
		amount_minor: i32,
		currency_code: String,
		receipt: EthPaymentReceipt,
	) -> FieldResult<PaymentId> {
		let payment_id = context
			.create_payment_usecase
			.create(
				request_id.into(),
				Amount::new(amount_minor as i64, Currency::Crypto(currency_code)),
				PaymentReceipt::OnChainPayment {
					network: BlockchainNetwork::Ethereum,
					recipient_address: receipt.recipient_address.parse()?,
					transaction_hash: receipt.transaction_hash.parse()?,
				},
			)
			.await?;

		Ok(PaymentId {
			id: payment_id.into(),
		})
	}
}
