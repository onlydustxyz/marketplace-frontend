use std::fmt::Display;

use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

use super::Reason;
use crate::{
	AggregateEvent, Amount, GithubUserId, Payment, PaymentId, PaymentReceipt, PaymentReceiptId,
	UserId,
};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Requested {
		id: PaymentId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount: Amount,
		reason: Reason,
		requested_at: NaiveDateTime,
	},
	Cancelled {
		id: PaymentId,
	},
	Processed {
		id: PaymentId,
		receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
		processed_at: NaiveDateTime,
	},
	InvoiceReceived {
		id: PaymentId,
		received_at: NaiveDateTime,
	},
	InvoiceRejected {
		id: PaymentId,
	},
}

impl AggregateEvent<Payment> for Event {
	fn aggregate_id(&self) -> &PaymentId {
		match self {
			Self::Requested { id, .. }
			| Self::Processed { id, .. }
			| Self::Cancelled { id }
			| Self::InvoiceReceived { id, .. }
			| Self::InvoiceRejected { id } => id,
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

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use assert_json_diff::assert_json_eq;
	use chrono::{NaiveDate, NaiveTime};
	use rstest::*;
	use serde_json::{json, Value};
	use testing::fixtures::payment::constants::{CONTRACT_ADDRESSES, TRANSACTION_HASHES};
	use uuid::Uuid;

	use super::*;
	use crate::{BlockchainNetwork, Currency, TransactionHash};

	#[fixture]
	fn payment_id() -> PaymentId {
		Uuid::from_str("abad1756-18ba-42e2-8cbf-83369cecfb38").unwrap().into()
	}

	#[fixture]
	fn payment_receipt_id() -> PaymentReceiptId {
		Uuid::from_str("b5db0b56-ab3e-4bd1-b9a2-6a3d41f35b8f").unwrap().into()
	}

	#[fixture]
	fn recipient_address() -> &'static str {
		CONTRACT_ADDRESSES[0]
	}

	#[fixture]
	fn transaction_hash() -> TransactionHash {
		TRANSACTION_HASHES[0].parse().unwrap()
	}

	#[rstest]
	fn test_display(recipient_address: &'static str, transaction_hash: TransactionHash) {
		let event = Event::Processed {
			id: payment_id(),
			receipt_id: payment_receipt_id(),
			amount: Amount::new(
				"500.45".parse().unwrap(),
				Currency::Crypto("USDC".to_string()),
			),
			receipt: PaymentReceipt::OnChainPayment {
				network: BlockchainNetwork::Ethereum,
				recipient_address: recipient_address.try_into().unwrap(),
				transaction_hash: transaction_hash.clone(),
			},
			processed_at: NaiveDateTime::new(
				NaiveDate::from_ymd_opt(2023, 3, 22).unwrap(),
				NaiveTime::from_hms_opt(10, 30, 0).unwrap(),
			),
		};

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
							"recipient_address": recipient_address,
							"transaction_hash": transaction_hash,
						}
					},
					"processed_at": "2023-03-22T10:30:00"
				}
			})
		);
	}
}
