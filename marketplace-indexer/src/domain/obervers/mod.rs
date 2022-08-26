mod application;
pub use application::ApplicationObserver;

mod composite;
pub use composite::ObserverComposite;

mod logging;
pub use logging::Logger;

mod contribution;
pub use contribution::ContributionObserver;

mod confirmed;
pub use confirmed::Confirmed as ConfirmedObserver;

use crate::domain::*;
use mockall::automock;

use marketplace_domain::*;

#[automock]
pub trait Observer: Send + Sync {
	fn on_connect(&self, _indexer_id: &IndexerId) {}
	fn on_new_event(&self, _event: &Event, _block_number: u64) {}
	fn on_new_block(&self, _block_hash: &BlockHash, _block_number: u64) {}
	fn on_reorg(&self) {}
}
