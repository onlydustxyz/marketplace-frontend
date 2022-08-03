mod contracts;
use contracts::{ContributionContract, ProfileContract, RegistryContract};

mod model;
use log::{error, info, warn};
use mapinto::ResultMapErrInto;
pub use model::*;

mod action_queue;
use action_queue::ActionQueue;

mod services;

mod error;
pub use error::Error as StarknetError;
use tokio::{
	sync::oneshot::{error::TryRecvError, Receiver},
	task::JoinHandle,
};

use std::{
	env,
	sync::{Arc, RwLock, RwLockWriteGuard},
	thread,
	time::Duration,
};

pub use starknet::accounts::Account;
use starknet::{
	accounts::SingleOwnerAccount,
	core::{chain_id, types::FieldElement},
	providers::SequencerGatewayProvider,
	signers::{LocalWallet, SigningKey},
};

use crate::{domain::*, infrastructure::starknet::action_queue::store_action_result};

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

// TODO: refactor to event driven to remove dependency on database
pub fn spawn<A: Account + Sync + Send + 'static>(
	contribution_service: Arc<Client<A>>,
	contribution_repository: Arc<dyn ContributionRepository>,
	mut shutdown_recv: Receiver<bool>,
) -> JoinHandle<()> {
	// TODO: merge within starknet::Client to avoid leaking out the action queue
	let cloned_action_queue = contribution_service.action_queue();

	tokio::spawn(async move {
		loop {
			info!("Thread heartbeat");
			let next_actions = if let Ok(mut queue) = cloned_action_queue.write() {
				queue.pop_n(100)
			} else {
				vec![]
			};

			if !next_actions.is_empty() {
				let handle = contribution_service.execute_actions(next_actions.clone()).await;

				match tokio::join!(handle).0 {
					Ok(result) => match result {
						Ok(transaction_hash) => {
							match store_action_result(
								&*contribution_repository,
								&next_actions,
								&transaction_hash,
							) {
								Ok(_) => info!("All actions executed successfully"),
								Err(e) => {
									warn!("Cannot execute actions on database: {}", e.to_string())
								},
							}
						},
						Err(e) => warn!(
							"Cannot execute actions on smart contract: {}",
							e.to_string()
						),
					},
					Err(error) => error!("Child thread panicked: {error}"),
				}
			}

			// Look if shutdown signat have been issued
			match shutdown_recv.try_recv() {
				Ok(_) => return,
				Err(TryRecvError::Closed) => return,
				Err(TryRecvError::Empty) => {},
			}

			// Wait a bit and do it again
			thread::sleep(Duration::from_secs(5));
		}
	})
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

	pub async fn execute_actions(
		&self,
		actions: Vec<Action>,
	) -> JoinHandle<Result<String, StarknetError>> {
		let cloned_contributions = self.contributions.clone();
		tokio::spawn(async move {
			cloned_contributions.execute_actions(&actions, true).await.map_err_into()
		})
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

	pub fn action_queue(&self) -> Arc<RwLock<ActionQueue>> {
		self.action_queue.clone()
	}
}

pub type LocalSingleOwnerAccount = SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>;
pub type SingleAdminClient = Client<LocalSingleOwnerAccount>;

impl Default for SingleAdminClient {
	fn default() -> Self {
		Self::new(Arc::new(make_account_from_env()))
	}
}
