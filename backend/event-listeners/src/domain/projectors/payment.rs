use crate::{
	domain::{EventListener, Payment},
	infrastructure::database::PaymentRepository,
};
use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, PaymentEvent};

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
