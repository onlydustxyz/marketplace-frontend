use anyhow::Result;
use async_trait::async_trait;
use domain::{BudgetEvent, Event, PaymentEvent, ProjectEvent, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{EventListener, Payment},
	infrastructure::database::PaymentRepository,
};

pub struct Projector {
	repository: PaymentRepository,
}

impl Projector {
	pub fn new(repository: PaymentRepository) -> Self {
		Self { repository }
	}
}

#[async_trait]
impl EventListener for Projector {
	#[instrument(name = "payment_projection", skip(self))]
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		let Event::Project(event) = event;
		if let ProjectEvent::Budget {
			event:
				BudgetEvent::Payment {
					event:
						PaymentEvent::Processed {
							id,
							receipt_id,
							amount,
							receipt,
						},
					..
				},
			..
		} = event
		{
			self.repository.upsert(&Payment::new(
				*receipt_id,
				*amount.amount(),
				amount.currency().to_string(),
				serde_json::to_value(receipt)
					.map_err(|e| SubscriberCallbackError::Discard(e.into()))?,
				(*id).into(),
			))?
		}
		Ok(())
	}
}
