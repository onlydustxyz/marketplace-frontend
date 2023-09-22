use std::sync::Arc;

use anyhow::Result;
use derive_more::Constructor;
use domain::{
	AggregateRepository, Amount, DomainError, Event, Payment, PaymentId, PaymentReceipt,
	PaymentReceiptId, Publisher,
};
use olog::IntoField;
use tracing::instrument;

use crate::{application::dusty_bot, domain::Publishable};

#[derive(Constructor)]
pub struct Usecase {
	event_publisher: Arc<dyn Publisher<Event>>,
	payment_repository: AggregateRepository<Payment>,
	close_issues_usecase: dusty_bot::close_issues::Usecase,
}

impl Usecase {
	#[instrument(skip(self))]
	pub async fn add_payment_receipt(
		&self,
		payment_id: PaymentId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<PaymentReceiptId, DomainError> {
		let new_receipt_id = PaymentReceiptId::new();

		let payment = self.payment_repository.find_by_id(&payment_id)?;

		self.payment_repository
			.find_by_id(&payment_id)?
			.add_receipt(new_receipt_id, amount, receipt)
			.map_err(|e| DomainError::InvalidInputs(e.into()))?
			.map(Event::from)
			.collect::<Vec<_>>()
			.publish(self.event_publisher.clone())
			.await?;

		if let Err(error) = self.close_issues_usecase.close_all_issues(payment.clone()).await {
			olog::error!(error = error.to_field(), "Unable to comment / close issue")
		}

		Ok(new_receipt_id)
	}
}
