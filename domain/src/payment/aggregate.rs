use super::amount::Amount;
use crate::{specifications, Aggregate, PaymentEvent, PaymentId, PaymentReceipt, PaymentRequestId};
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Payment {
	id: PaymentId,
}

impl Aggregate for Payment {
	type Event = PaymentEvent;
	type Id = PaymentId;
}

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Specification(specifications::Error),
}

impl Payment {
	pub fn create(
		id: PaymentId,
		request_id: PaymentRequestId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		let events = vec![PaymentEvent::Created {
			id,
			amount,
			request_id,
			receipt,
		}];

		Ok(events)
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::{BlockchainNetwork, Currency};
	use rstest::*;
	use rust_decimal_macros::dec;
	use testing::fixtures::payment::*;
	use uuid::Uuid;

	#[fixture]
	#[once]
	fn payment_request_id() -> PaymentRequestId {
		Uuid::new_v4().into()
	}

	#[fixture]
	#[once]
	fn payment_id() -> PaymentId {
		Uuid::new_v4().into()
	}

	#[fixture]
	fn amount() -> Amount {
		Amount::new(dec!(123.45), Currency::Crypto("USDC".to_string()))
	}

	#[fixture]
	fn receipt() -> PaymentReceipt {
		PaymentReceipt::OnChainPayment {
			network: BlockchainNetwork::Ethereum,
			recipient_address: recipient_address(),
			transaction_hash: transaction_hash(),
		}
	}

	#[fixture]
	fn payment_created_event(
		payment_request_id: &PaymentRequestId,
		payment_id: &PaymentId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> PaymentEvent {
		PaymentEvent::Created {
			id: *payment_id,
			request_id: *payment_request_id,
			amount,
			receipt,
		}
	}

	#[rstest]
	fn test_create(
		payment_request_id: &PaymentRequestId,
		payment_id: &PaymentId,
		payment_created_event: PaymentEvent,
		amount: Amount,
		receipt: PaymentReceipt,
	) {
		let events = Payment::create(*payment_id, *payment_request_id, amount, receipt)
			.expect("Problem when creating payment");

		assert_eq!(events, vec![payment_created_event]);
	}
}
