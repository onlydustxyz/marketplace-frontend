use std::collections::HashMap;

use derive_getters::Getters;
use rust_decimal::Decimal;
use serde_json::Value;
use thiserror::Error;

use crate::{
	Aggregate, AggregateEvent, Amount, BudgetEvent, BudgetId, Entity, EventSourcable, GithubUserId,
	Payment, PaymentId, UserId,
};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Not enough budget left")]
	Overspent,
	#[error("Invalid currency")]
	InvalidCurrency,
}

type Result<T> = std::result::Result<T, Error>;

#[derive(Default, Debug, Clone, PartialEq, Eq, Getters)]
pub struct Budget {
	id: BudgetId,
	allocated_amount: Amount,
	payments: HashMap<PaymentId, Payment>,
}

impl Budget {
	pub fn allocate(id: BudgetId, amount: Amount) -> Vec<BudgetEvent> {
		vec![BudgetEvent::Allocated { id, amount }]
	}

	pub fn request_payment(
		&self,
		payment_id: PaymentId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount: Amount,
		reason: Value,
	) -> Result<Vec<BudgetEvent>> {
		if self.allocated_amount.currency() != amount.currency() {
			return Err(Error::InvalidCurrency);
		}

		if self.spent_amount() + amount.amount() > *self.allocated_amount.amount() {
			return Err(Error::Overspent);
		}

		Ok(
			Payment::request(payment_id, requestor_id, recipient_id, amount, reason)
				.into_iter()
				.map(|event| BudgetEvent::Payment { id: self.id, event })
				.collect(),
		)
	}

	fn spent_amount(&self) -> Decimal {
		self.payments.values().fold(Decimal::ZERO, |amount, payment| {
			amount + payment.requested_usd_amount()
		})
	}
}

impl Entity for Budget {
	type Id = BudgetId;
}

impl Aggregate for Budget {
	type Event = BudgetEvent;
}

impl EventSourcable for Budget {
	fn apply_event(mut self, event: &Self::Event) -> Self {
		match event {
			BudgetEvent::Allocated { id, amount, .. } => Self {
				id: *id,
				allocated_amount: amount.clone(),
				..Default::default()
			},
			BudgetEvent::Spent { .. } => self,
			BudgetEvent::Payment { event, .. } => {
				let payment_id = event.aggregate_id();

				self.payments
					.entry(*payment_id)
					.and_modify(|payment| *payment = payment.clone().apply_event(event))
					.or_insert_with(|| Payment::default().apply_event(event));
				self
			},
		}
	}
}

#[cfg(test)]
mod tests {
	use assert_matches::assert_matches;
	use rstest::*;
	use rust_decimal_macros::dec;
	use uuid::Uuid;

	use super::*;
	use crate::*;

	#[fixture]
	#[once]
	fn budget_id() -> BudgetId {
		Uuid::new_v4().into()
	}

	#[fixture]
	#[once]
	fn project_id() -> ProjectId {
		Uuid::new_v4().into()
	}

	#[fixture]
	fn amount() -> Amount {
		Amount::new(dec!(500), crate::Currency::Crypto("USDC".to_string()))
	}

	#[fixture]
	fn budget_allocated_event(budget_id: &BudgetId, amount: Amount) -> BudgetEvent {
		BudgetEvent::Allocated {
			id: *budget_id,
			amount,
		}
	}

	#[fixture]
	fn budget_spent_event(budget_id: &BudgetId, amount: Amount) -> BudgetEvent {
		BudgetEvent::Spent {
			id: *budget_id,
			amount,
		}
	}

	#[rstest]
	fn allocate_budget_for_project(
		budget_id: &BudgetId,
		amount: Amount,
		budget_allocated_event: BudgetEvent,
	) {
		assert_eq!(
			Budget::allocate(*budget_id, amount),
			vec![budget_allocated_event]
		);
	}

	#[rstest]
	fn spend_budget(amount: Amount, budget_allocated_event: BudgetEvent) {
		let budget = Budget::from_events(&[budget_allocated_event]);
		let result = budget.request_payment(
			Default::default(),
			Default::default(),
			Default::default(),
			amount,
			Default::default(),
		);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		let events = result.unwrap();
		assert_matches!(
			events[0],
			BudgetEvent::Payment {
				id: _,
				event: PaymentEvent::Requested { .. }
			}
		);
	}

	#[rstest]
	fn overspend_budget(amount: Amount, budget_allocated_event: BudgetEvent) {
		let budget = Budget::from_events(&[budget_allocated_event]);
		let result = budget.request_payment(
			Default::default(),
			Default::default(),
			Default::default(),
			Amount::new(amount.amount() * dec!(2), amount.currency().clone()),
			Default::default(),
		);
		assert_matches!(result, Err(Error::Overspent));
	}

	#[rstest]
	fn spend_in_different_currency(budget_allocated_event: BudgetEvent) {
		let budget = Budget::from_events(&[budget_allocated_event]);
		let result = budget.request_payment(
			Default::default(),
			Default::default(),
			Default::default(),
			Amount::new(dec!(10), crate::Currency::Crypto("USDT".to_string())),
			Default::default(),
		);

		assert_matches!(result, Err(Error::InvalidCurrency));
	}
}
