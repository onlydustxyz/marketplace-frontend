use std::fmt::Display;

use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};

use crate::{aggregate::Identified, sponsor, BudgetId, Currency};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Created {
		id: BudgetId,
		currency: &'static Currency,
	},
	Allocated {
		id: BudgetId,
		amount: Decimal,
		sponsor_id: Option<sponsor::Id>,
	},
	Spent {
		id: BudgetId,
		amount: Decimal,
	},
}

impl Identified<BudgetId> for Event {
	fn id(&self) -> &BudgetId {
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
