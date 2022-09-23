use anyhow::{anyhow, Result};
use starknet::{
	accounts::Call,
	core::types::{AddTransactionResult, FieldElement},
	providers::SequencerGatewayProvider,
};
use url::Url;

mod contributions;
pub use contributions::ContributionsContract;

pub mod accounts;
pub use accounts::Account;

pub struct ContractAdministrator<'a> {
	administrator_account: &'a Account,
}

impl<'a> ContractAdministrator<'a> {
	pub fn new(administrator_account: &'a Account) -> Self {
		Self {
			administrator_account,
		}
	}

	async fn send_transaction(&self, calls: &[Call]) -> Result<AddTransactionResult> {
		use starknet::accounts::Account;
		self.administrator_account
			.execute(calls)
			.send()
			.await
			.map_err(|e| anyhow!(e.to_string()))
	}
}

fn local_sequencer() -> SequencerGatewayProvider {
	SequencerGatewayProvider::new(
		Url::parse("http://127.0.0.1:5050/gateway").unwrap(),
		Url::parse("http://127.0.0.1:5050/feeder_gateway").unwrap(),
	)
}
