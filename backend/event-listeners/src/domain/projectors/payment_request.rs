use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, PaymentEvent, SubscriberCallbackError};
use infrastructure::database::DatabaseError;
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
		match event {
			Event::Payment(event) => match event {
				PaymentEvent::Requested {
					id,
					budget_id,
					requestor_id,
					recipient_id,
					amount_in_usd,
					reason,
					requested_at,
				} => self
					.repository
					.upsert(&PaymentRequest::new(
						*id,
						*budget_id,
						*requestor_id,
						*recipient_id,
						*amount_in_usd as i64,
						reason.clone(),
						*requested_at,
					))
					.map_err(DatabaseError::into),
				PaymentEvent::Cancelled { id } =>
					self.repository.delete(id).map_err(DatabaseError::into),
				PaymentEvent::Processed { .. } => Ok(()),
			},
			_ => Ok(()),
		}
	}
}
