use std::sync::Arc;

use anyhow::Result;
use domain::{
	AggregateRootRepository, Amount, Destination, DomainError, Event, PaymentId, PaymentReceipt,
	PaymentReceiptId, Project, ProjectId, Publisher,
};
use event_store::bus::QUEUE_NAME as EVENT_STORE_QUEUE;
use infrastructure::amqp::UniqueMessage;
use tracing::instrument;

pub struct Usecase {
	event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
	project_repository: AggregateRootRepository<Project>,
}

impl Usecase {
	pub fn new(
		event_publisher: Arc<dyn Publisher<UniqueMessage<Event>>>,
		project_repository: AggregateRootRepository<Project>,
	) -> Self {
		Self {
			event_publisher,
			project_repository,
		}
	}

	#[instrument(skip(self))]
	pub async fn add_payment_receipt(
		&self,
		project_id: &ProjectId,
		payment_id: &PaymentId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<PaymentReceiptId, DomainError> {
		let new_receipt_id = PaymentReceiptId::new();
		let project = self.project_repository.find_by_id(&project_id)?;
		let events: Vec<_> = project
			.add_payment_receipt(payment_id, new_receipt_id, amount, receipt)
			.await
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.into_iter()
			.map(Event::from)
			.map(UniqueMessage::new)
			.collect();

		self.event_publisher
			.publish_many(Destination::queue(EVENT_STORE_QUEUE), &events)
			.await?;

		Ok(new_receipt_id)
	}
}
