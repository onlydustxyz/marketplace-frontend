use std::sync::Arc;

use anyhow::{anyhow, Result};
use derive_more::Constructor;
use domain::blockchain::evm;
#[cfg(test)]
use mockall::mock;

use crate::infrastructure::web3::ens;

#[derive(Constructor)]
pub struct IsValid {
	ens_client: Arc<ens::Client>,
}

impl IsValid {
	pub async fn is_satisfied_by(&self, ens_name: evm::Name) -> Result<bool> {
		match self.ens_client.eth_address(ens_name.as_str()).await {
			Ok(_) => Ok(true),
			Err(ens::Error::NotRegistered) => Ok(false),
			Err(error) => Err(anyhow!(error)),
		}
	}
}

#[cfg(test)]
mock! {
	pub IsValid {
		pub fn new(ens_client: Arc<ens::Client>) -> Self;
		pub async fn is_satisfied_by(&self, ens_name: evm::Name) -> Result<bool> ;
	}
}

#[cfg(test)]
mod tests {
	use mockall::predicate::eq;
	use rstest::{fixture, rstest};

	use super::*;

	const ENS_NAME: &str = "vitalik.eth";

	#[fixture]
	fn ens_name() -> evm::Name {
		evm::Name::new(ENS_NAME.to_string())
	}

	#[rstest]
	#[tokio::test]
	async fn valid_ens(ens_name: evm::Name) {
		let mut ens_client = ens::Client::default();
		ens_client
			.expect_eth_address()
			.once()
			.with(eq(ENS_NAME))
			.returning(|_| Ok(Default::default()));

		let result = IsValid::new(Arc::new(ens_client)).is_satisfied_by(ens_name).await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert!(result.unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn invalid_ens(ens_name: evm::Name) {
		let mut ens_client = ens::Client::default();
		ens_client
			.expect_eth_address()
			.once()
			.with(eq(ENS_NAME))
			.returning(|_| Err(ens::Error::NotRegistered));

		let result = IsValid::new(Arc::new(ens_client)).is_satisfied_by(ens_name).await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert!(!result.unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn ens_error(ens_name: evm::Name) {
		let mut ens_client = ens::Client::default();
		ens_client
			.expect_eth_address()
			.once()
			.with(eq(ENS_NAME))
			.returning(|_| Err(ens::Error::Contract(anyhow!("Unable to call ENS contract"))));

		let result = IsValid::new(Arc::new(ens_client)).is_satisfied_by(ens_name).await;
		assert!(result.is_err());
	}
}
