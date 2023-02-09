use std::fmt::Display;

use serde::{Deserialize, Serialize};

use crate::{AggregateEvent, Amount, Budget, BudgetId, PaymentEvent};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Allocated { id: BudgetId, amount: Amount },
	Spent { id: BudgetId, amount: Amount },
	Payment { id: BudgetId, event: PaymentEvent },
}

impl AggregateEvent<Budget> for Event {
	fn aggregate_id(&self) -> &BudgetId {
		match self {
			Self::Allocated { id, .. } | Self::Spent { id, .. } | Self::Payment { id, .. } => id,
		}
	}
}

impl Display for Event {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(&self).map_err(|_| std::fmt::Error)?
		)
	}
}
