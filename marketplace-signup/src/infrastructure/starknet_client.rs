use std::str::FromStr;

use starknet::{
	accounts::{single_owner::GetNonceError, SingleOwnerAccount},
	core::{
		chain_id::{MAINNET, TESTNET},
		types::{BlockId, FieldElement, InvokeFunctionTransactionRequest},
		utils::get_selector_from_name,
	},
	providers::{Provider, SequencerGatewayProvider},
	signers::{LocalWallet, SigningKey},
};

pub struct StarkNetClient {
	pub provider: SequencerGatewayProvider,
	pub account: SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>,
	pub badge_registry_address: FieldElement,
}

impl StarkNetClient {
	pub fn new(
		hex_account_address: &str,
		hex_private_key: &str,
		hex_badge_registry_address: &str,
		chain: StarkNetChain,
	) -> Self {
		let provider = match chain {
			StarkNetChain::Testnet => SequencerGatewayProvider::starknet_alpha_goerli(),
			StarkNetChain::Mainnet => SequencerGatewayProvider::starknet_alpha_mainnet(),
		};
		let account_provider = match chain {
			StarkNetChain::Testnet => SequencerGatewayProvider::starknet_alpha_goerli(),
			StarkNetChain::Mainnet => SequencerGatewayProvider::starknet_alpha_mainnet(),
		};
		let chain_id = match chain {
			StarkNetChain::Testnet => TESTNET,
			StarkNetChain::Mainnet => MAINNET,
		};
		let signer = LocalWallet::from(SigningKey::from_secret_scalar(
			FieldElement::from_hex_be(hex_private_key).expect("Invalid private key"),
		));
		let account_address =
			FieldElement::from_hex_be(hex_account_address).expect("Invalid account address");
		let badge_registry_address = FieldElement::from_hex_be(hex_badge_registry_address)
			.expect("Invalid address for badge_registry");

		StarkNetClient {
			provider,
			account: SingleOwnerAccount::new(account_provider, signer, account_address, chain_id),
			badge_registry_address,
		}
	}

	pub async fn get_2d_nonce(
		&self,
		nonce_key: FieldElement,
	) -> Result<FieldElement, GetNonceError<<SequencerGatewayProvider as Provider>::Error>> {
		let call_result = self
			.provider
			.call_contract(
				InvokeFunctionTransactionRequest {
					contract_address: self.account.address(),
					entry_point_selector: get_selector_from_name("get_nonce").unwrap(),
					calldata: vec![nonce_key],
					signature: vec![],
					max_fee: FieldElement::ZERO,
				},
				BlockId::Latest,
			)
			.await
			.map_err(GetNonceError::ProviderError)?;

		if call_result.result.len() == 1 {
			Ok(call_result.result[0])
		} else {
			Err(GetNonceError::InvalidResponseLength {
				expected: 1,
				actual: call_result.result.len(),
			})
		}
	}
}

pub enum StarkNetChain {
	Testnet,
	Mainnet,
}

impl FromStr for StarkNetChain {
	type Err = ();

	fn from_str(input: &str) -> Result<StarkNetChain, Self::Err> {
		match input {
			"TESTNET" => Ok(StarkNetChain::Testnet),
			"MAINNET" => Ok(StarkNetChain::Mainnet),
			_ => Err(()),
		}
	}
}

#[cfg(test)]
mod tests {
	use starknet::core::types::FieldElement;
	use std::{thread, time::Duration};

	use starknet::{core::types::TransactionStatus, providers::Provider};

	impl super::StarkNetClient {
		#[cfg(test)]
		pub async fn wait_for_transaction_acceptance(
			&self,
			transaction_hash: FieldElement,
		) -> Result<(), ()> {
			println!(
				"Waiting for transaction 0x{:x} to be accepted",
				transaction_hash
			);

			loop {
				let receipt = match self.provider.get_transaction_status(transaction_hash).await {
					Ok(receipt) => receipt,
					Err(e) => {
						warn!("{}", e);
						thread::sleep(Duration::from_secs(3));
						continue;
					},
				};

				println!("Transaction is {:?}", receipt.status);

				break match receipt.status {
					TransactionStatus::NotReceived
					| TransactionStatus::Received
					| TransactionStatus::Pending => {
						thread::sleep(Duration::from_secs(3));
						continue;
					},
					TransactionStatus::AcceptedOnL2 | TransactionStatus::AcceptedOnL1 => Ok(()),
					TransactionStatus::Rejected => Err(()),
				};
			}
		}
	}
}
