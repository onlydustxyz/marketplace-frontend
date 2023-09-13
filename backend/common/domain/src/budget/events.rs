use std::fmt::Display;

use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};

use crate::{AggregateEvent, Budget, BudgetId, Currency};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Created {
		id: BudgetId,
		currency: &'static Currency,
	},
	Allocated {
		id: BudgetId,
		amount: Decimal,
	},
	Spent {
		id: BudgetId,
		amount: Decimal,
	},
}

impl AggregateEvent<Budget> for Event {
	fn aggregate_id(&self) -> &BudgetId {
		match self {
			Self::Created { id, .. } | Self::Allocated { id, .. } | Self::Spent { id, .. } => id,
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

impl From<Event> for crate::Event {
	fn from(event: Event) -> Self {
		Self::Budget(event)
	}
}
