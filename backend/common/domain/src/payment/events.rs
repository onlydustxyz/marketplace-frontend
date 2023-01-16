use std::fmt::Display;

use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::{Amount, BudgetId, GithubUserId, PaymentId, PaymentReceipt, PaymentReceiptId, UserId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Requested {
		id: PaymentId,
		budget_id: BudgetId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount_in_usd: u32,
		reason: Value,
	},
	Cancelled {
		id: PaymentId,
	},
	Processed {
		id: PaymentId,
		receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
	},
}

impl From<Event> for crate::Event {
	fn from(event: Event) -> Self {
		Self::Payment(event)
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
	use assert_json_diff::assert_json_eq;
	use serde_json::{json, Value};
	use testing::fixtures::payment::{events, recipient_address, transaction_hash};

	use super::*;
	use crate::{BlockchainNetwork, Currency};

	#[test]
	fn test_display() {
		let event = events::payment_processed();

		assert_json_eq!(
			serde_json::from_str::<Value>(&event.to_string()).unwrap(),
			json!({
				"Processed": {
					"id": "abad1756-18ba-42e2-8cbf-83369cecfb38",
					"receipt_id":"b5db0b56-ab3e-4bd1-b9a2-6a3d41f35b8f",
					"amount":{
						"amount":"500.45",
						"currency":{
							"Crypto":"USDC"
						}
					},
					"receipt":{
						"OnChainPayment":{
							"network":"Ethereum",
							"recipient_address": recipient_address(),
							"transaction_hash": transaction_hash()
						}
					}
				}
			})
		);
	}

	#[test]
	fn test_to_domain_event() {
		let event = Event::Processed {
			id: Default::default(),
			receipt_id: Default::default(),
			amount: Amount::new(
				"500.45".parse().unwrap(),
				Currency::Crypto("USDC".to_string()),
			),
			receipt: PaymentReceipt::OnChainPayment {
				network: BlockchainNetwork::Ethereum,
				recipient_address: Default::default(),
				transaction_hash: Default::default(),
			},
		};

		let domain_event: crate::Event = event.clone().into();
		assert_eq!(domain_event, crate::Event::Payment(event));
	}
}
