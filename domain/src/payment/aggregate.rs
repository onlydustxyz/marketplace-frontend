use crate::{Aggregate, PaymentEvent, PaymentId, PaymentReceipt, PaymentRequestId};
use serde::{Deserialize, Serialize};

use super::amount::Amount;

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Payment {
	id: PaymentId,
}

impl Aggregate for Payment {
	type Event = PaymentEvent;
	type Id = PaymentId;
}

impl Payment {
	pub fn create(
		id: PaymentId,
		request_id: PaymentRequestId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Vec<<Self as Aggregate>::Event> {
		vec![PaymentEvent::Created {
			id,
			amount,
			request_id,
			receipt,
		}]
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::{BlockchainNetwork, Currency};
	use rust_decimal_macros::dec;
	use testing::fixtures::payment::*;
	use uuid::Uuid;

	#[test]
	fn test_create() {
		let events = Payment::create(
			Uuid::from(payment_id()).into(),
			Uuid::from(payment_request_id()).into(),
			Amount::new(dec!(123.45), Currency::Crypto("USDC".to_string())),
			PaymentReceipt::OnChainPayment {
				network: BlockchainNetwork::Ethereum,
				recipient_address: recipient_address(),
				transaction_hash: transaction_hash(),
			},
		);

		assert_eq!(
			events,
			vec![PaymentEvent::Created {
				id: Uuid::from(payment_id()).into(),
				request_id: Uuid::from(payment_request_id()).into(),
				amount: Amount::new(dec!(123.45), Currency::Crypto("USDC".to_string())),
				receipt: PaymentReceipt::OnChainPayment {
					network: BlockchainNetwork::Ethereum,
					recipient_address: recipient_address(),
					transaction_hash: transaction_hash(),
				}
			}]
		);
	}
}
