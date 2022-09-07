use std::fmt::Display;
mod composite;
use async_trait::async_trait;
pub use composite::ObserverComposite;

mod logging;
pub use logging::Logger;

mod contribution;
pub use contribution::ContributionObserver;

mod project;
pub use project::ProjectObserver;

mod confirmed;
pub use confirmed::{ConfirmedObserver, WithBockConfirmationCount};
use serde::{Deserialize, Serialize};

mod event_store;
pub use event_store::EventStoreObserver;

use crate::domain::*;
use mockall::automock;

use marketplace_domain::*;

#[automock]
#[async_trait]
pub trait Observer: Send + Sync {
	async fn on_connect(&self, _indexer_id: &IndexerId) {}
	async fn on_new_event(&self, _event: &ObservedEvent, _block_number: u64) {}
	async fn on_new_block(&self, _block_hash: &BlockHash, _block_number: u64) {}
	async fn on_reorg(&self) {}
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ObservedEvent {
	pub event: Event,
	pub deduplication_id: String,
}

impl Display for ObservedEvent {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(self).map_err(|_| std::fmt::Error)?
		)
	}
}

#[cfg(test)]
impl Default for ObservedEvent {
	fn default() -> Self {
		Self {
			event: Event::Contribution(ContributionEvent::Validated {
				id: Default::default(),
			}),
			deduplication_id: "dedup".to_string(),
		}
	}
}
