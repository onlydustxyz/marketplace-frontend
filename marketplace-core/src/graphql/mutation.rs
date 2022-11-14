use super::Context;
use juniper::{graphql_object, FieldResult, GraphQLInputObject, GraphQLObject};
use marketplace_domain::{BlockchainNetwork, PaymentReceipt};
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

	pub async fn eth_payment_processed(
		context: &Context,
		id: Uuid,
		receipt: EthPaymentReceipt,
	) -> FieldResult<PaymentId> {
		context
			.mark_payment_as_processed_usecase
			.mark_payment_as_processed(
				id.into(),
				PaymentReceipt::OnChainPayment {
					network: BlockchainNetwork::Ethereum,
					recipient_address: receipt.recipient_address.parse()?,
					transaction_hash: receipt.transaction_hash.parse()?,
				},
			)
			.await?;

		Ok(PaymentId { id })
	}
}
