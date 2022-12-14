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
	use testing::fixtures::payment::events;

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
							"recipient_address":"0x07B3616D2450b6390e9D14B92DE8B766e6d93Fd22fB9AFdE882705154045F2e1",
							"transaction_hash":"0x797fb77202901c52094d2544f3631a3535b8ca40009f6a6ac6940b67e6873a4"
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
