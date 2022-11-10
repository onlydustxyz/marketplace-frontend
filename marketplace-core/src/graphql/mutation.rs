use super::Context;
use chrono::Utc;
use juniper::{graphql_object, FieldResult, GraphQLInputObject, GraphQLObject};
use marketplace_domain::{BlockchainNetwork, Destination, Payment, PaymentReceipt};
use marketplace_event_store::{bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event, EventOrigin};
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
		let events: Vec<Event> = Payment::mark_as_processed(
			id.into(),
			PaymentReceipt::OnChainPayment {
				network: BlockchainNetwork::Ethereum,
				recipient_address: receipt.recipient_address.parse()?,
				transaction_hash: receipt.transaction_hash.parse()?,
			},
		)
		.into_iter()
		.map(|event| Event {
			deduplication_id: context.uuid_generator.new_uuid().to_string(),
			event: event.into(),
			timestamp: Utc::now().naive_utc(),
			origin: EventOrigin::BACKEND,
			metadata: Default::default(),
		})
		.collect();

		context
			.event_publisher
			.publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
			.await?;

		Ok(PaymentId { id })
	}
}
