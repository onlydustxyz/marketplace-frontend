use std::fmt::Display;
mod composite;
use async_trait::async_trait;
use chrono::NaiveDateTime;

pub use composite::ObserverComposite;

mod logging;
pub use logging::Logger;

mod confirmed;
pub use confirmed::{ConfirmedObserver, WithBockConfirmationCount};
use serde::{Deserialize, Serialize};

mod event_filter_repository;
pub use event_filter_repository::EventFilterRepositoryObserver;

mod indexer;
pub use indexer::IndexerObserver;

use serde_json::Value;

use crate::domain::*;
use mockall::automock;

use marketplace_domain::*;

#[automock]
#[async_trait]
#[allow(unused_variables)]
pub trait Observer: Send + Sync {
	async fn on_connect(&self) {}
	async fn on_new_event(&self, observed_event: &ObservedEvent, block_number: u64) {}
	async fn on_new_block(&self, block_hash: &BlockHash, block_number: u64) {}
	async fn on_reorg(&self) {}
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ObservedEvent {
	pub event: Event,
	pub deduplication_id: String,
	pub timestamp: NaiveDateTime,
	pub metadata: Value,
	pub indexer_id: IndexerId,
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
		use chrono::Utc;
		Self {
			event: Event::Contribution(ContributionEvent::Validated {
				id: Default::default(),
			}),
			deduplication_id: "dedup".to_string(),
			timestamp: Utc::now().naive_utc(),
			metadata: Default::default(),
			indexer_id: "starknet".to_string(),
		}
	}
}
