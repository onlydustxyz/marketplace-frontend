use crate::{Amount, BudgetId, BudgetTopic};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Allocated {
		id: BudgetId,
		topic: BudgetTopic,
		amount: Amount,
	},
}

impl From<Event> for crate::Event {
	fn from(event: Event) -> Self {
		Self::Budget(event)
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
