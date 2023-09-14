use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use derive_more::Constructor;
use domain::{BudgetEvent, Event, SubscriberCallbackError};
use infrastructure::database::Repository;
use rust_decimal::Decimal;
use tracing::instrument;

use super::EventListener;
use crate::models::*;

#[derive(Constructor)]
pub struct Projector {
	budget_repository: Arc<dyn Repository<Budget>>,
}

#[async_trait]
impl EventListener<Event> for Projector {
	#[instrument(name = "budget_projection", skip(self))]
	async fn on_event(&self, event: Event) -> Result<(), SubscriberCallbackError> {
		if let Event::Budget(event) = event {
			match event {
				BudgetEvent::Created {
					id: budget_id,
					currency,
				} => {
					self.budget_repository.upsert(Budget {
						id: budget_id,
						initial_amount: Decimal::ZERO,
						remaining_amount: Decimal::ZERO,
						currency: currency.try_into()?,
					})?;
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount,
				} => {
					let mut budget = self.budget_repository.find_by_id(budget_id)?;
					budget.remaining_amount += amount;
					budget.initial_amount += amount;
					self.budget_repository.update(budget)?;
				},
				BudgetEvent::Spent {
					id: budget_id,
					amount,
				} => {
					let mut budget = self.budget_repository.find_by_id(budget_id)?;
					budget.remaining_amount -= amount;
					self.budget_repository.update(budget)?;
				},
			}
		}
		Ok(())
	}
}
