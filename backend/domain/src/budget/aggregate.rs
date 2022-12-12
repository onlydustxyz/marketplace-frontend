use crate::{
	Aggregate, AggregateRoot, Amount, BudgetEvent, BudgetId, BudgetTopic, Entity, EventSourcable,
	UserId,
};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Not enough budget left")]
	Overspent,
	#[error("Invalid currency")]
	InvalidCurrency,
}

type Result<T> = std::result::Result<T, Error>;

#[derive(Default, Clone)]
pub struct Budget {
	id: BudgetId,
	remaining_amount: Amount,
}

impl Budget {
	pub fn allocate(id: BudgetId, topic: BudgetTopic, amount: Amount) -> Vec<BudgetEvent> {
		vec![BudgetEvent::Allocated { id, topic, amount }]
	}

	pub fn spend(&self, amount: &Amount) -> Result<Vec<BudgetEvent>> {
		if self.remaining_amount.currency() != amount.currency() {
			return Err(Error::InvalidCurrency);
		}

		if &self.remaining_amount < amount {
			return Err(Error::Overspent);
		}

		Ok(vec![BudgetEvent::Spent {
			id: self.id,
			amount: amount.clone(),
		}])
	}

	pub fn assign_spender(&self, spender_id: &UserId) -> Vec<BudgetEvent> {
		vec![BudgetEvent::SpenderAssigned {
			id: self.id,
			spender_id: *spender_id,
		}]
	}
}

impl Entity for Budget {
	type Id = BudgetId;
}

impl Aggregate for Budget {
	type Event = BudgetEvent;
}

impl EventSourcable for Budget {
	fn apply_event(self, event: &Self::Event) -> Self {
		match event {
			BudgetEvent::Allocated { id, amount, .. } => Self {
				id: *id,
				remaining_amount: amount.clone(),
			},
			BudgetEvent::Spent { amount, .. } => Self {
				remaining_amount: self.remaining_amount - amount,
				..self
			},
			BudgetEvent::SpenderAssigned { .. } => self,
		}
	}
}

impl AggregateRoot for Budget {}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::ProjectId;
	use assert_matches::assert_matches;
	use rstest::*;
	use rust_decimal_macros::dec;
	use uuid::Uuid;

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
	fn spender_id() -> UserId {
		Uuid::new_v4().into()
	}

	#[fixture]
	fn topic(project_id: &ProjectId) -> BudgetTopic {
		BudgetTopic::Project(*project_id)
	}

	#[fixture]
	fn amount() -> Amount {
		Amount::new(dec!(500), crate::Currency::Crypto("USDC".to_string()))
	}

	#[fixture]
	fn budget_allocated_event(
		budget_id: &BudgetId,
		amount: Amount,
		topic: BudgetTopic,
	) -> BudgetEvent {
		BudgetEvent::Allocated {
			id: *budget_id,
			topic,
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

	#[fixture]
	fn budget_spender_assigned_event(budget_id: &BudgetId, spender_id: &UserId) -> BudgetEvent {
		BudgetEvent::SpenderAssigned {
			id: *budget_id,
			spender_id: *spender_id,
		}
	}

	#[rstest]
	fn allocate_budget_for_project(
		budget_id: &BudgetId,
		amount: Amount,
		topic: BudgetTopic,
		budget_allocated_event: BudgetEvent,
	) {
		assert_eq!(
			Budget::allocate(*budget_id, topic, amount),
			vec![budget_allocated_event]
		);
	}

	#[rstest]
	fn spend_budget(
		amount: Amount,
		budget_allocated_event: BudgetEvent,
		budget_spent_event: BudgetEvent,
	) {
		let budget = Budget::from_events(&[budget_allocated_event]);
		let result = budget.spend(&amount);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		let events = result.unwrap();
		assert_eq!(events, vec![budget_spent_event]);
	}

	#[rstest]
	fn overspend_budget(amount: Amount, budget_allocated_event: BudgetEvent) {
		let budget = Budget::from_events(&[budget_allocated_event]);
		let result = budget.spend(&(amount * 2));
		assert_matches!(result, Err(Error::Overspent));
	}

	#[rstest]
	fn spend_in_different_currency(budget_allocated_event: BudgetEvent) {
		let budget = Budget::from_events(&[budget_allocated_event]);
		let result = budget.spend(&Amount::new(
			dec!(10),
			crate::Currency::Crypto("USDT".to_string()),
		));
		assert_matches!(result, Err(Error::InvalidCurrency));
	}

	#[rstest]
	fn assign_spender(
		budget_allocated_event: BudgetEvent,
		budget_spender_assigned_event: BudgetEvent,
		spender_id: &UserId,
	) {
		let budget = Budget::from_events(&[budget_allocated_event]);
		let events = budget.assign_spender(spender_id);
		assert_eq!(events, vec![budget_spender_assigned_event]);
	}
}
