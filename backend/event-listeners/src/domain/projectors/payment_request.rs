use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::{BudgetEvent, Event, PaymentEvent, ProjectEvent, SubscriberCallbackError};
use infrastructure::database::DatabaseError;
use rust_decimal::prelude::ToPrimitive;
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
		let Event::Project(event) = event;
		if let ProjectEvent::Budget { event, .. } = event {
			if let BudgetEvent::Payment {
				id: budget_id,
				event,
			} = event
			{
				return match event {
					PaymentEvent::Requested {
						id,
						requestor_id,
						recipient_id,
						amount,
						reason,
						requested_at,
					} => self
						.repository
						.upsert(&PaymentRequest::new(
							*id,
							*budget_id,
							*requestor_id,
							*recipient_id,
							amount.amount().to_i64().ok_or_else(|| {
								SubscriberCallbackError::Fatal(anyhow!(
									"Failed to project invalid amount {amount}"
								))
							})?,
							reason.clone(),
							*requested_at,
						))
						.map_err(DatabaseError::into),
					PaymentEvent::Cancelled { id } =>
						self.repository.delete(id).map_err(DatabaseError::into),
					PaymentEvent::Processed { .. } => Ok(()),
				};
			}
		}

		Ok(())
	}
}
