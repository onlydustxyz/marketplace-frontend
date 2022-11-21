use crate::domain::{EventListener, Payment, ProjectionRepository};
use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, PaymentEvent};
use std::sync::Arc;

pub struct Projector {
	repository: Arc<dyn ProjectionRepository<Payment>>,
}

impl Projector {
	pub fn new(repository: Arc<dyn ProjectionRepository<Payment>>) -> Self {
		Self { repository }
	}
}

#[async_trait]
impl EventListener for Projector {
	async fn on_event(&self, event: &Event) -> Result<()> {
		if let Event::Payment(event) = event {
			match event {
				PaymentEvent::Created {
					id,
					request_id,
					amount,
					receipt,
				} => self.repository.insert(&Payment::new(
					(*id).into(),
					*amount.amount(),
					amount.currency().to_string(),
					serde_json::to_value(receipt)?,
					(*request_id).into(),
				))?,
			}
		}
		Ok(())
	}
}
