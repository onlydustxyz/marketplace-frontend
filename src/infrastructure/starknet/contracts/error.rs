use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Transaction was reverted")]
	TransactionReverted(String),
}
