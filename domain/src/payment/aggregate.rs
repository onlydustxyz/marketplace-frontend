use super::amount::Amount;
#[cfg_attr(test, double)]
use crate::specifications::PaymentRequestExists;
use crate::{specifications, Aggregate, PaymentEvent, PaymentId, PaymentReceipt, PaymentRequestId};
#[cfg(test)]
use mockall_double::double;
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
	#[error("Payment request not found")]
	PaymentRequestNotFound,
	#[error(transparent)]
	Specification(specifications::Error),
}

impl Payment {
	pub fn create(
		payment_request_exists: &PaymentRequestExists,
		id: PaymentId,
		request_id: PaymentRequestId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		if !payment_request_exists
			.is_satisfied_by(&request_id)
			.map_err(Error::Specification)?
		{
			return Err(Error::PaymentRequestNotFound);
		}

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
	#[double]
	use crate::specifications::PaymentRequestExists;
	use crate::{AggregateRootRepositoryError, BlockchainNetwork, Currency, EventStoreError};
	use anyhow::anyhow;
	use assert_matches::assert_matches;
	use mockall::predicate::eq;
	use rstest::*;
	use rust_decimal_macros::dec;
	use testing::fixtures::payment::*;
	use uuid::Uuid;

	#[fixture]
	fn payment_request_exists() -> PaymentRequestExists {
		PaymentRequestExists::default()
	}

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
		mut payment_request_exists: PaymentRequestExists,
		payment_request_id: &PaymentRequestId,
		payment_id: &PaymentId,
		payment_created_event: PaymentEvent,
		amount: Amount,
		receipt: PaymentReceipt,
	) {
		payment_request_exists
			.expect_is_satisfied_by()
			.with(eq(*payment_request_id))
			.once()
			.returning(|_| Ok(true));

		let events = Payment::create(
			&payment_request_exists,
			*payment_id,
			*payment_request_id,
			amount,
			receipt,
		)
		.expect("Problem when creating payment");

		assert_eq!(events, vec![payment_created_event]);
	}

	#[rstest]
	fn test_create_with_invalid_payment_request_id(
		mut payment_request_exists: PaymentRequestExists,
		payment_request_id: &PaymentRequestId,
		payment_id: &PaymentId,
		amount: Amount,
		receipt: PaymentReceipt,
	) {
		payment_request_exists.expect_is_satisfied_by().once().returning(|_| Ok(false));

		let result = Payment::create(
			&payment_request_exists,
			*payment_id,
			*payment_request_id,
			amount,
			receipt,
		);

		assert_matches!(result, Err(Error::PaymentRequestNotFound));
	}

	#[rstest]
	fn test_error_in_specification(
		mut payment_request_exists: PaymentRequestExists,
		payment_request_id: &PaymentRequestId,
		payment_id: &PaymentId,
		amount: Amount,
		receipt: PaymentReceipt,
	) {
		payment_request_exists.expect_is_satisfied_by().once().returning(|_| {
			Err(specifications::Error::EventStore(
				AggregateRootRepositoryError::EventStoreError(EventStoreError::Connection(
					anyhow!("oops"),
				)),
			))
		});

		let result = Payment::create(
			&payment_request_exists,
			*payment_id,
			*payment_request_id,
			amount,
			receipt,
		);

		assert_matches!(result, Err(Error::Specification(_)));
	}
}
