use std::fmt::Display;

use crate::{PaymentId, PaymentReceipt};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Processed {
		id: PaymentId,
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
	use serde_json::json;

	#[test]
	fn test_display() {
		let event = Event::Processed {
			id: Default::default(),
			receipt: PaymentReceipt::OnChainPayment {
				network: crate::BlockchainNetwork::Ethereum,
				recipient_address: Default::default(),
				transaction_hash: Default::default(),
			},
		};

		assert_eq!(
			event.to_string(),
			serde_json::to_string(&json!({
				"Processed": {
					"id": "00000000-0000-0000-0000-000000000000",
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
		let event = Event::Processed {
			id: Default::default(),
			receipt: PaymentReceipt::OnChainPayment {
				network: crate::BlockchainNetwork::Ethereum,
				recipient_address: Default::default(),
				transaction_hash: Default::default(),
			},
		};

		let domain_event: crate::Event = event.clone().into();
		assert_eq!(domain_event, crate::Event::Payment(event));
	}
}
