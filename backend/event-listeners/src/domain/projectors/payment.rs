use crate::domain::{EventListener, Payment};
use anyhow::Result;
use async_trait::async_trait;
use domain::{EntityRepository, Event, PaymentEvent};
use std::sync::Arc;

pub struct Projector {
	repository: Arc<dyn EntityRepository<Payment>>,
}

impl Projector {
	pub fn new(repository: Arc<dyn EntityRepository<Payment>>) -> Self {
		Self { repository }
	}
}

#[async_trait]
impl EventListener for Projector {
	async fn on_event(&self, event: &Event) -> Result<()> {
		if let Event::Payment(PaymentEvent::Processed {
			id,
			receipt_id,
			amount,
			receipt,
		}) = event
		{
			self.repository.insert(&Payment::new(
				(*receipt_id).into(),
				*amount.amount(),
				amount.currency().to_string(),
				serde_json::to_value(receipt)?,
				(*id).into(),
			))?
		}
		Ok(())
	}
}
