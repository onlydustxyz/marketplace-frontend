use std::fmt::Display;

use crate::{PaymentId, PaymentReceipt, PaymentRequestId};
use serde::{Deserialize, Serialize};

use super::amount::Amount;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Created {
		id: PaymentId,
		request_id: PaymentRequestId,
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
	use super::*;
	use crate::{BlockchainNetwork, Currency};
	use serde_json::json;
	use testing::fixtures::payment::events;

	#[test]
	fn test_display() {
		let event = events::payment_created();

		assert_eq!(
			event.to_string(),
			serde_json::to_string(&json!({
				"Created": {
					"id": "00000000-0000-0000-0000-000000000000",
					"request_id": "00000000-0000-0000-0000-000000000000",
					"receipt": {
						"OnChainPayment": {
							"network": "Ethereum",
							"recipient_address": "",
							"transaction_hash": ""
						}
					}
				}
			}))
			.unwrap()
		);
	}

	#[test]
	fn test_to_domain_event() {
		let event = Event::Created {
			id: Default::default(),
			request_id: Default::default(),
			amount: Amount::new(50000, Currency::Crypto("USDC".to_string())),
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
