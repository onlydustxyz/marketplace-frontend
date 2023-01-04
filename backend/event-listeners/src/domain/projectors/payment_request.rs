use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, PaymentEvent, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{EventListener, PaymentRequest},
	infrastructure::database::PaymentRequestRepository,
};

pub struct Projector {
	repository: PaymentRequestRepository,
}

impl Projector {
	pub fn new(repository: PaymentRequestRepository) -> Self {
		Self { repository }
	}
}

#[async_trait]
impl EventListener for Projector {
	#[instrument(name = "payment_request_projection", skip(self))]
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Payment(PaymentEvent::Requested {
			id,
			budget_id,
			requestor_id,
			recipient_id,
			amount_in_usd,
			reason,
		}) = event
		{
			self.repository.insert(&PaymentRequest::new(
				*id,
				*budget_id,
				*requestor_id,
				*recipient_id,
				*amount_in_usd as i64,
				reason.clone(),
			))?
		}
		Ok(())
	}
}
