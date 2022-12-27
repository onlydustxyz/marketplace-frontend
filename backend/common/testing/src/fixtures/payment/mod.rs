use std::str::FromStr;

use domain::{PaymentId, PaymentReceiptId, TransactionHash};
use uuid::Uuid;

use self::constants::CONTRACT_ADDRESSES;
use crate::fixtures::payment::constants::TRANSACTION_HASHES;

pub mod constants;
pub mod events;

pub fn payment_id() -> PaymentId {
	Uuid::from_str("abad1756-18ba-42e2-8cbf-83369cecfb38").unwrap().into()
}

pub fn payment_receipt_id() -> PaymentReceiptId {
	Uuid::from_str("b5db0b56-ab3e-4bd1-b9a2-6a3d41f35b8f").unwrap().into()
}

pub fn recipient_address() -> &'static str {
	CONTRACT_ADDRESSES[0]
}

pub fn transaction_hash() -> TransactionHash {
	TRANSACTION_HASHES[0].parse().unwrap()
}
