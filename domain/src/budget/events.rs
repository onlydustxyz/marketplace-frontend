use crate::{Amount, BudgetId, BudgetTopic};
use serde::{Deserialize, Serialize};
use std::fmt::Display;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Allocated {
		id: BudgetId,
		topic: BudgetTopic,
		amount: Amount,
	},
	Spent {
		id: BudgetId,
		amount: Amount,
	},
}

impl From<Event> for crate::Event {
	fn from(event: Event) -> Self {
		Self::Budget(event)
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

#[cfg(test)]
mod tests {
	use super::*;
	use assert_matches::assert_matches;

	#[test]
	fn to_domain_event() {
		assert_matches!(
			Event::Allocated {
				id: Default::default(),
				topic: BudgetTopic::Project(Default::default()),
				amount: Amount::new(
					Default::default(),
					crate::Currency::Crypto("USDC".to_string())
				)
			}
			.into(),
			crate::Event::Budget(_)
		)
	}
}
