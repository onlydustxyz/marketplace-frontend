use crate::{Amount, BudgetEvent, BudgetId, BudgetTopic};

pub struct Budget;

impl Budget {
	pub fn allocate(id: BudgetId, topic: BudgetTopic, amount: Amount) -> Vec<BudgetEvent> {
		vec![BudgetEvent::Allocated { id, topic, amount }]
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::ProjectId;
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
}
