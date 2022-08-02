mod contracts;
use contracts::{ContributionContract, ProfileContract, RegistryContract};

mod model;
use mapinto::ResultMapErrInto;
pub use model::*;

pub mod action_queue; // TODO remove pub when refactoring is done
use action_queue::ActionQueue;

mod services;

mod error;
pub use error::Error as StarknetError;

use std::{
	env,
	sync::{Arc, RwLock, RwLockWriteGuard},
};

pub use starknet::accounts::Account;
use starknet::{
	accounts::SingleOwnerAccount,
	core::{chain_id, types::FieldElement},
	providers::SequencerGatewayProvider,
	signers::{LocalWallet, SigningKey},
};

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
	SequencerGatewayProvider::starknet_alpha_goerli()
}

pub struct Client<A: Account + Sync> {
	registry: RegistryContract,
	contributions: ContributionContract<A>,
	profile: ProfileContract,
	action_queue: Arc<RwLock<ActionQueue>>,
}

impl<A: Account + Sync> Client<A> {
	pub fn new(account: Arc<A>) -> Self {
		Self {
			registry: RegistryContract::default(),
			contributions: ContributionContract::new(account),
			profile: ProfileContract::default(),
			action_queue: Arc::new(RwLock::new(ActionQueue::new())),
		}
	}

	pub async fn execute_actions(&self, actions: &[Action]) -> Result<String, StarknetError> {
		self.contributions.execute_actions(actions, true).await.map_err_into()
	}

	pub async fn get_user_information(
		&self,
		contributor_id: &ContributorId,
	) -> Option<Contributor> {
		let account = self.profile.get_account(contributor_id).await?;
		self.registry.get_user_information(account).await
	}

	fn action_queue_mut(&self) -> Result<RwLockWriteGuard<'_, ActionQueue>, StarknetError> {
		self.action_queue.write().map_err(|e| StarknetError::Mutex(e.to_string()))
	}
}

pub type LocalSingleOwnerAccount = SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>;
pub type SingleAdminClient = Client<LocalSingleOwnerAccount>;

impl Default for SingleAdminClient {
	fn default() -> Self {
		Self::new(Arc::new(make_account_from_env()))
	}
}
