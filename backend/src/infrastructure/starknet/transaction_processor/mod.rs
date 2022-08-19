pub mod dequeuer;

use super::{ActionQueue, Client, StarknetError};
use crate::domain::*;
use async_trait::async_trait;
use mapinto::ResultMapErrInto;
use mockall::automock;
pub use starknet::accounts::Account;
use std::sync::{Arc, RwLock};
use tokio::task::JoinHandle;

#[automock]
#[async_trait]
pub trait TransactionProcessor: Send + Sync {
	async fn execute_actions(
		&self,
		actions: Vec<Action>,
	) -> Vec<JoinHandle<Result<String, StarknetError>>>;

	fn action_queue(&self) -> Arc<RwLock<ActionQueue>>;
}

#[async_trait]
impl<A: Account + Sync + Send + 'static> TransactionProcessor for Client<A> {
	async fn execute_actions(
		&self,
		actions: Vec<Action>,
	) -> Vec<JoinHandle<Result<String, StarknetError>>> {
		actions
			.into_iter()
			.map(|action| {
				let cloned_contributions = self.contributions.clone();
				tokio::spawn(async move {
					cloned_contributions.execute_actions(&[action], true).await.map_err_into()
				})
			})
			.collect()
	}

	fn action_queue(&self) -> Arc<RwLock<ActionQueue>> {
		self.action_queue.clone()
	}
}
