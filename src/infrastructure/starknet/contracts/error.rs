use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happened during a contract call: {0}")]
	Call(String),
	#[error("Something happened when sending a transaction: {0}")]
	SendTransaction(String),
	#[error("Something happened when getting the nonce: {0}")]
	GetNonce(String),
	#[error("Transaction was reverted: {0}")]
	TransactionReverted(String),
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[rstest]
	#[case(Error::Call(String::from("message")))]
	#[case(Error::SendTransaction(String::from("message")))]
	#[case(Error::GetNonce(String::from("message")))]
	#[case(Error::TransactionReverted(String::from("message")))]
	fn error_description_contains_underlying_message(#[case] error: Error) {
		assert!(error.to_string().ends_with("message"));
	}
}
