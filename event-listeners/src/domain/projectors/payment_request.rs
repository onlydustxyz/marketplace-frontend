use crate::domain::{EventListener, PaymentRequest};
use anyhow::Result;
use async_trait::async_trait;
use domain::{EntityRepository, Event, PaymentEvent};
use std::sync::Arc;

pub struct Projector {
	repository: Arc<dyn EntityRepository<PaymentRequest>>,
}

impl Projector {
	pub fn new(repository: Arc<dyn EntityRepository<PaymentRequest>>) -> Self {
		Self { repository }
	}
}

#[async_trait]
impl EventListener for Projector {
	async fn on_event(&self, event: &Event) -> Result<()> {
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
				(*id).into(),
				(*budget_id).into(),
				(*requestor_id).into(),
				(*recipient_id).into(),
				*amount_in_usd as i64,
				reason.clone(),
			))?
		}
		Ok(())
	}
}
