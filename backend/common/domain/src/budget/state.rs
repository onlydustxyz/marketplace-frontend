use rust_decimal::Decimal;

use crate::{BudgetEvent, BudgetId, EventSourcable};

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct State {
	pub id: BudgetId,
	pub allocated_amount: Decimal,
	pub spent_amount: Decimal,
}

impl EventSourcable for State {
	type Event = BudgetEvent;
	type Id = BudgetId;

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
