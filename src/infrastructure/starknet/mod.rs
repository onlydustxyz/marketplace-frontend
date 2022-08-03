mod contracts;
use contracts::{ContributionContract, ProfileContract, RegistryContract};

mod model;
pub use model::*;

mod action_queue;
use action_queue::ActionQueue;

mod services;

mod error;
pub use error::Error as StarknetError;

mod transaction_processor;
pub use transaction_processor::dequeuer::spawn;

pub use starknet::accounts::Account;
use starknet::{
	accounts::SingleOwnerAccount,
	core::{chain_id, types::FieldElement},
	providers::SequencerGatewayProvider,
	signers::{LocalWallet, SigningKey},
};
use std::{
	env,
	sync::{Arc, RwLock},
};
use url::Url;

use crate::domain::*;

fn make_account_from_env() -> SingleOwnerAccount<SequencerGatewayProvider, LocalWallet> {
	let private_key = env::var("PRIVATE_KEY").expect("PRIVATE_KEY must be set");
	let account_address = env::var("ACCOUNT_ADDRESS").expect("ACCOUNT_ADDRESS must be set");
	make_account(&private_key, &account_address)
}

fn make_account(
	private_key: &str,
	account_address: &str,
) -> SingleOwnerAccount<SequencerGatewayProvider, LocalWallet> {
	let signer = LocalWallet::from(SigningKey::from_secret_scalar(
		FieldElement::from_hex_be(private_key).unwrap(),
	));

	// TODO: make chain_id configurable
	SingleOwnerAccount::new(
		sequencer(),
		signer,
		FieldElement::from_hex_be(account_address).unwrap(),
		chain_id::TESTNET,
	)
}

fn sequencer() -> SequencerGatewayProvider {
	match std::env::var("NETWORK") {
		Ok(network) if network == *"devnet" => SequencerGatewayProvider::new(
			Url::parse("http://127.0.0.1:5050/gateway").unwrap(),
			Url::parse("http://127.0.0.1:5050/feeder_gateway").unwrap(),
		),
		Ok(network) if network == *"alpha-goerli" =>
			SequencerGatewayProvider::starknet_alpha_goerli(),
		Ok(network) if network == *"alpha-mainnet" =>
			SequencerGatewayProvider::starknet_alpha_mainnet(),
		_ => SequencerGatewayProvider::starknet_alpha_goerli(), // Default to goerli
	}
}

pub struct Client<A: Account + Sync + Send> {
	registry: RegistryContract,
	contributions: Arc<ContributionContract<A>>,
	profile: ProfileContract,
	action_queue: Arc<RwLock<ActionQueue>>,
}

impl<A: Account + Sync + Send + 'static> Client<A> {
	pub fn new(account: Arc<A>) -> Self {
		Self {
			registry: RegistryContract::default(),
			contributions: Arc::new(ContributionContract::new(account)),
			profile: ProfileContract::default(),
			action_queue: Arc::new(RwLock::new(ActionQueue::new())),
		}
	}

	pub async fn get_user_information(
		&self,
		contributor_id: &ContributorId,
	) -> Option<Contributor> {
		let account = self.profile.get_account(contributor_id).await?;
		self.registry.get_user_information(account).await
	}
}

pub type LocalSingleOwnerAccount = SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>;
pub type SingleAdminClient = Client<LocalSingleOwnerAccount>;

impl Default for SingleAdminClient {
	fn default() -> Self {
		Self::new(Arc::new(make_account_from_env()))
	}
}
