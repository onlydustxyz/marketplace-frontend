use crate::fixtures::payment::constants::TRANSACTION_HASHES;
use domain::{ContractAddress, PaymentId, TransactionHash};
use std::str::FromStr;
use uuid::Uuid;

use self::constants::CONTRACT_ADDRESSES;

pub mod constants;
pub mod events;

pub fn payment_id() -> PaymentId {
	Uuid::from_str("abad1756-18ba-42e2-8cbf-83369cecfb38").unwrap().into()
}

pub fn recipient_address() -> ContractAddress {
	CONTRACT_ADDRESSES[0].parse().unwrap()
}

pub fn transaction_hash() -> TransactionHash {
	TRANSACTION_HASHES[0].parse().unwrap()
}
