use rust_decimal::Decimal;
use thiserror::Error;

use crate::{sponsor, Aggregate, BudgetEvent, BudgetId, Currency, EventSourcable};

#[derive(Debug, Error, PartialEq, Eq)]
pub enum Error {
	#[error("Not enough budget left")]
	Overspent,
}

type Result<T> = std::result::Result<T, Error>;

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Budget {
	pub id: BudgetId,
	pub allocated_amount: Decimal,
	pub spent_amount: Decimal,
	pending_events: Vec<BudgetEvent>,
}

impl Budget {
	pub fn create(id: BudgetId, currency: &'static Currency) -> Self {
		Self::default().with_pending_events(&[BudgetEvent::Created { id, currency }])
	}

	pub fn allocate(self, amount: Decimal, sponsor_id: Option<sponsor::Id>) -> Result<Self> {
		if self.allocated_amount + amount < self.spent_amount {
			return Err(Error::Overspent);
		}

		let event = BudgetEvent::Allocated {
			id: self.id,
			amount,
			sponsor_id,
		};

		Ok(self.with_pending_events(&[event]))
	}

	pub fn spend(self, amount: Decimal) -> Result<Self> {
		if self.spent_amount + amount > self.allocated_amount {
			return Err(Error::Overspent);
		}

		let event = BudgetEvent::Spent {
			id: self.id,
			amount,
		};

		Ok(self.with_pending_events(&[event]))
	}
}

impl Aggregate for Budget {
	type Event = BudgetEvent;
	type Id = BudgetId;

	fn pending_events(&mut self) -> &mut Vec<Self::Event> {
		&mut self.pending_events
	}
}

impl EventSourcable for Budget {
	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			BudgetEvent::Created { id, .. } => Self {
				id: *id,
				allocated_amount: Decimal::ZERO,
				spent_amount: Decimal::ZERO,
				..self
			},
			BudgetEvent::Allocated { id, amount, .. } => Self {
				id: *id,
				allocated_amount: self.allocated_amount + amount,
				..self
			},
			BudgetEvent::Spent { amount, .. } => Self {
				spent_amount: self.spent_amount + amount,
				..self
			},
		}
	}
}

#[cfg(test)]
mod tests {
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
	fn amount() -> Decimal {
		dec!(500)
	}

	#[fixture]
	fn currency() -> &'static Currency {
		currencies::USD
	}

	#[fixture]
	fn budget_created_event(budget_id: &BudgetId, currency: &'static Currency) -> BudgetEvent {
		BudgetEvent::Created {
			id: *budget_id,
			currency,
		}
	}

	#[fixture]
	fn budget_allocated_event(budget_id: &BudgetId, amount: Decimal) -> BudgetEvent {
		BudgetEvent::Allocated {
			id: *budget_id,
			amount,
			sponsor_id: None,
		}
	}

	#[fixture]
	fn budget_spent_event(budget_id: &BudgetId, amount: Decimal) -> BudgetEvent {
		BudgetEvent::Spent {
			id: *budget_id,
			amount,
		}
	}

	#[fixture]
	fn budget_refund_event(budget_id: &BudgetId, amount: Decimal) -> BudgetEvent {
		BudgetEvent::Spent {
			id: *budget_id,
			amount: -amount,
		}
	}

	#[rstest]
	fn create_budget(
		budget_id: &BudgetId,
		currency: &'static Currency,
		budget_created_event: BudgetEvent,
	) {
		assert_eq!(
			Budget::create(*budget_id, currency).pending_events,
			&[budget_created_event]
		);
	}

	#[rstest]
	fn allocate_budget(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event]);
		assert_eq!(
			budget.allocate(amount, None).unwrap().pending_events,
			&[budget_allocated_event]
		);
	}

	#[rstest]
	fn spend_budget(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
		budget_spent_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event, budget_allocated_event]);
		assert_eq!(
			budget.spend(amount).unwrap().pending_events,
			&[budget_spent_event]
		);
	}

	#[rstest]
	fn refund_budget(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
		budget_spent_event: BudgetEvent,
		budget_refund_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[
			budget_created_event,
			budget_allocated_event,
			budget_spent_event,
		]);
		assert_eq!(
			budget.spend(-amount).unwrap().pending_events,
			&[budget_refund_event]
		);
	}

	#[rstest]
	fn overspend_budget(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event, budget_allocated_event]);
		assert_eq!(budget.spend(amount * dec!(2)), Err(Error::Overspent));
	}

	#[rstest]
	fn refill_budget(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
		budget_spent_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[
			budget_created_event,
			budget_allocated_event,
			budget_spent_event,
		]);

		// refill and start spending again !
		let budget = budget.allocate(amount, None).unwrap().spend(amount).unwrap();

		// no more budget !
		assert_eq!(budget.spent_amount, budget.allocated_amount);
	}

	#[rstest]
	fn cut_budget(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
		budget_spent_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[
			budget_created_event,
			budget_allocated_event.clone(),
			budget_allocated_event,
			budget_spent_event,
		]);

		// cut budget
		let budget = budget.allocate(-amount, None).unwrap();

		// no more budget !
		assert_eq!(budget.spent_amount, budget.allocated_amount);
	}

	#[rstest]
	fn cannot_cut_budget_below_spent(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
		budget_spent_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[
			budget_created_event,
			budget_allocated_event,
			budget_spent_event,
		]);

		// cut budget fails
		assert_eq!(budget.allocate(-amount, None), Err(Error::Overspent));
	}
}
