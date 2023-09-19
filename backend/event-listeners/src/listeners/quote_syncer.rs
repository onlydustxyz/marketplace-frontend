use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use chrono::Utc;
use derive_more::Constructor;
use domain::{currencies, services::quotes, BudgetEvent, Event, SubscriberCallbackError};
use infrastructure::database::Repository;
use tracing::instrument;

use super::EventListener;
use crate::models::*;

#[derive(Constructor)]
pub struct Projector {
	quotes_repository: Arc<dyn Repository<CryptoUsdQuote>>,
	quote_service: Arc<dyn quotes::Service>,
}

#[async_trait]
impl EventListener<Event> for Projector {
	#[instrument(name = "budget_projection", skip(self))]
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Budget(event) = event {
			match event {
				BudgetEvent::Created { currency, .. } if currency != currencies::USD => {
					let code = currency.try_into()?;

					if !self.quotes_repository.exists(code)? {
						let price = self
							.quote_service
							.fetch_conversion_rate(currency)
							.await
							.map_err(SubscriberCallbackError::Discard)?;

						self.quotes_repository.insert(CryptoUsdQuote {
							currency: code,
							price,
							updated_at: Utc::now().naive_utc(),
						})?;
					}
				},
				_ => (),
			}
		}
		Ok(())
	}
}
