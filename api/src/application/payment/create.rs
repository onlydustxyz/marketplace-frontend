use anyhow::Result;
use domain::{
	specifications::PaymentRequestExists as PaymentRequestExistsSpecification,
	AggregateRootRepository, Amount, Destination, Event, Payment, PaymentId, PaymentReceipt,
	PaymentRequest, PaymentRequestId, Publisher, UniqueMessage, UuidGenerator,
};
use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;
use std::sync::Arc;

pub struct Usecase {
	uuid_generator: Arc<dyn UuidGenerator>,
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	payment_request_exists_specification: PaymentRequestExistsSpecification,
}

impl Usecase {
	pub fn new(
		uuid_generator: Arc<dyn UuidGenerator>,
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		payment_request_repository: AggregateRootRepository<PaymentRequest>,
	) -> Self {
		Self {
			uuid_generator,
			event_publisher,
			payment_request_exists_specification: PaymentRequestExistsSpecification::new(
				payment_request_repository,
			),
		}
	}

	pub async fn create(
		&self,
		request_id: PaymentRequestId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<PaymentId> {
		let payment_id = self.uuid_generator.new_uuid();
		let events: Vec<_> = Payment::create(
			&self.payment_request_exists_specification,
			payment_id.into(),
			request_id,
			amount,
			receipt,
		)?
		.into_iter()
		.map(Event::from)
		.map(UniqueMessage::new)
		.collect();

		self.event_publisher
			.publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
			.await?;

		Ok(payment_id.into())
	}
}
