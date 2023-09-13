use rust_decimal::Decimal;
use thiserror::Error;

use crate::{Aggregate, BudgetEvent, BudgetId, Currency, EventSourcable};

#[derive(Debug, Error)]
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
}

impl Budget {
	pub fn create(id: BudgetId, currency: &'static Currency) -> Vec<BudgetEvent> {
		vec![BudgetEvent::Created { id, currency }]
	}

	pub fn allocate(&self, amount: Decimal) -> Result<Vec<BudgetEvent>> {
		if self.allocated_amount + amount < self.spent_amount {
			return Err(Error::Overspent);
		}

		Ok(vec![BudgetEvent::Allocated {
			id: self.id,
			amount,
		}])
	}

	pub fn spend(&self, amount: Decimal) -> Result<Vec<BudgetEvent>> {
		if self.spent_amount + amount > self.allocated_amount {
			return Err(Error::Overspent);
		}

		Ok(vec![BudgetEvent::Spent {
			id: self.id,
			amount,
		}])
	}
}

impl Aggregate for Budget {
	type Event = BudgetEvent;
	type Id = BudgetId;
}

impl EventSourcable for Budget {
	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			BudgetEvent::Created { id, .. } => Self {
				id: *id,
				allocated_amount: Decimal::ZERO,
				spent_amount: Decimal::ZERO,
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
	#[once]
	fn payment_id() -> PaymentId {
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
		}
	}

	#[fixture]
	fn budget_spent_event(budget_id: &BudgetId, amount: Decimal) -> BudgetEvent {
		BudgetEvent::Spent {
			id: *budget_id,
			amount,
		}
	}

	#[rstest]
	fn create_budget(
		budget_id: &BudgetId,
		currency: &'static Currency,
		budget_created_event: BudgetEvent,
	) {
		assert_eq!(
			Budget::create(*budget_id, currency),
			vec![budget_created_event]
		);
	}

	#[rstest]
	fn allocate_budget(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event]);
		let result = budget.allocate(amount);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(result.unwrap(), vec![budget_allocated_event]);
	}

	#[rstest]
	fn spend_budget(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
		budget_spent_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event, budget_allocated_event]);
		let result = budget.spend(amount);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		let events = result.unwrap();
		assert_eq!(events[0], budget_spent_event);
	}

	#[rstest]
	fn refund_budget(
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
		let result = budget.spend(-amount);
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	fn overspend_budget(
		amount: Decimal,
		budget_created_event: BudgetEvent,
		budget_allocated_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_created_event, budget_allocated_event]);
		let result = budget.spend(amount * dec!(2));
		assert_matches!(result, Err(Error::Overspent));
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

		// refill
		let result = budget.allocate(amount);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		let budget = budget.apply_events(&result.unwrap());

		// start spending again !
		let events = budget.spend(amount).unwrap();
		let budget = budget.apply_events(&events);

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
		let result = budget.allocate(-amount);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		let budget = budget.apply_events(&result.unwrap());

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
		let result = budget.allocate(-amount);
		assert_matches!(result, Err(Error::Overspent));
	}
}
