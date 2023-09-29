use std::sync::Arc;

use anyhow::anyhow;
use derive_more::Constructor;
use domain::blockchain::{aptos, evm, starknet, Network};
use infrastructure::dbclient::DatabaseError;
use thiserror::Error;

use crate::{domain::IsEnsValid, models::*};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Unable to update profile info")]
	Repository(#[from] DatabaseError),
	#[error("Provided input is invalid")]
	InvalidInput(#[source] anyhow::Error),
	#[error("Internal error")]
	Internal(#[source] anyhow::Error),
}

type Result<T> = std::result::Result<T, Error>;

#[derive(Constructor)]
pub struct Usecase {
	payout_info_repository: Arc<dyn PayoutInfoRepository>,
	is_ens_valid: IsEnsValid,
}

impl Usecase {
	pub async fn update_user_payout_info(
		&self,
		user_payout_info: UserPayoutInfo,
		bank_account: Option<BankAccount>,
		eth_wallet: Option<evm::Wallet>,
		optimism_address: Option<evm::Address>,
		aptos_address: Option<aptos::Address>,
		starknet_address: Option<starknet::Address>,
	) -> Result<()> {
		if let Some(evm::Wallet::Name(eth_name)) = eth_wallet.clone() {
			if !self
				.is_ens_valid
				.is_satisfied_by(eth_name)
				.await
				.map_err(|e| Error::Internal(anyhow!(e)))?
			{
				return Err(Error::InvalidInput(anyhow!("Invalid payout settings")));
			}
		}

		let user_id = user_payout_info.user_id;

		let mut wallets = Vec::new();
		if let Some(eth_wallet) = eth_wallet {
			wallets.push((user_id, Network::Ethereum, eth_wallet).into());
		}
		if let Some(optimism_address) = optimism_address {
			wallets.push((user_id, Network::Optimism, optimism_address).into());
		}
		if let Some(aptos_address) = aptos_address {
			wallets.push((user_id, aptos_address).into());
		}
		if let Some(starknet_address) = starknet_address {
			wallets.push((user_id, starknet_address).into());
		}

		self.payout_info_repository.upsert(user_payout_info, bank_account, wallets)?;

		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use domain::{blockchain::evm, UserId};
	use infrastructure::dbclient::Result;
	use mockall::{mock, predicate::eq};
	use rstest::{fixture, rstest};

	use super::*;

	mock! {
		pub Repository {}

		impl PayoutInfoRepository for Repository {
			fn upsert(
				&self,
				user_info: UserPayoutInfo,
				bank_account: Option<BankAccount>,
				wallets: Vec<Wallet>,
			) -> Result<()>;
		}
	}

	#[fixture]
	fn ens() -> evm::Name {
		evm::Name::new(Default::default())
	}

	#[rstest]
	#[tokio::test]
	async fn upsert_user_info_upon_valid_input(ens: evm::Name) {
		let mut payout_info_repository = MockRepository::default();
		payout_info_repository.expect_upsert().once().returning(|_, _, _| Ok(()));

		let mut payout_settings_valid = IsEnsValid::default();
		payout_settings_valid
			.expect_is_satisfied_by()
			.once()
			.with(eq(ens.clone()))
			.returning(|_| Ok(true));

		let usecase = Usecase::new(Arc::new(payout_info_repository), payout_settings_valid);
		let result = usecase
			.update_user_payout_info(
				UserPayoutInfo {
					user_id: UserId::new(),
					identity: Default::default(),
					location: Default::default(),
					usd_preferred_method: Default::default(),
				},
				Default::default(),
				Some(evm::Wallet::Name(ens)),
				Default::default(),
				Default::default(),
				Default::default(),
			)
			.await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn reject_upon_invalid_payout_settings(ens: evm::Name) {
		let payout_info_repository = MockRepository::default();
		let mut payout_settings_valid = IsEnsValid::default();
		payout_settings_valid
			.expect_is_satisfied_by()
			.once()
			.with(eq(ens.clone()))
			.returning(|_| Ok(false));

		let usecase = Usecase::new(Arc::new(payout_info_repository), payout_settings_valid);
		let result = usecase
			.update_user_payout_info(
				UserPayoutInfo {
					user_id: UserId::new(),
					identity: Default::default(),
					location: Default::default(),
					usd_preferred_method: Default::default(),
				},
				Default::default(),
				Some(evm::Wallet::Name(ens)),
				Default::default(),
				Default::default(),
				Default::default(),
			)
			.await;
		assert!(result.is_err());
	}
}
