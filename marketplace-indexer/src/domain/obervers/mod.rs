mod application;
use std::fmt::Display;

pub use application::ApplicationObserver;

mod composite;
pub use composite::ObserverComposite;

mod logging;
pub use logging::Logger;

mod contribution;
pub use contribution::ContributionObserver;

mod confirmed;
pub use confirmed::{ConfirmedObserver, WithBockConfirmationCount};
use serde::{Deserialize, Serialize};

mod contribution_event_store_logger;

use crate::domain::*;
use mockall::automock;

use marketplace_domain::*;

#[automock]
pub trait Observer: Send + Sync {
	fn on_connect(&self, _indexer_id: &IndexerId) {}
	fn on_new_event(&self, _event: &ObservedEvent, _block_number: u64) {}
	fn on_new_block(&self, _block_hash: &BlockHash, _block_number: u64) {}
	fn on_reorg(&self) {}
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
