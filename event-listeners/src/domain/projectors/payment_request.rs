use async_trait::async_trait;
use derive_more::Constructor;
use marketplace_domain::*;
use std::sync::Arc;
use thiserror::Error;
use tracing::error;

use crate::domain::EventListener;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	PaymentRequestRepository(#[from] PaymentRequestRepositoryError),
}

#[derive(Constructor)]
pub struct PaymentRequestProjector {
	payment_request_repository: Arc<dyn PaymentRequestRepository>,
}

impl PaymentRequestProjector {
	fn on_payment_requested(&self, payment_request: PaymentRequest) -> Result<(), Error> {
		self.payment_request_repository.insert(payment_request)?;

		Ok(())
	}
}

#[async_trait]
impl EventListener for PaymentRequestProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Project(ProjectEvent::PaymentRequested {
				id,
				project_id,
				requestor_id,
				recipient_id,
				amount_in_usd,
				reason,
			}) => self.on_payment_requested(PaymentRequest::new(
				*id,
				*project_id,
				*requestor_id,
				*recipient_id,
				*amount_in_usd,
				reason.clone(),
			)),
			_ => Ok(()),
		};

		if let Err(error) = result {
			error!("Unable to project event {event}: {}", error.to_string());
		}
	}
}
