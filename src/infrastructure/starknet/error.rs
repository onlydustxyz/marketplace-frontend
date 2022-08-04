use std::sync::PoisonError;

use super::contracts::ContractError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happened during contract invocation")]
	Contract(#[from] ContractError),
	#[error("Mutex lock cannot be acquired: {0}")]
	Mutex(String),
}

impl<T> From<PoisonError<T>> for Error {
	fn from(error: PoisonError<T>) -> Self {
		Self::Mutex(error.to_string())
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[rstest]
	#[case(Error::Mutex(String::from("message")))]
	fn error_description_contains_underlying_message(#[case] error: Error) {
		assert!(error.to_string().ends_with("message"));
	}

	#[rstest]
	fn can_build_error_from_poison() {
		let poison = PoisonError::new(String::from("message"));
		let message = format!("Mutex lock cannot be acquired: {}", poison);
		let error = Error::from(poison);

		assert_eq!(message, error.to_string());
	}
}
