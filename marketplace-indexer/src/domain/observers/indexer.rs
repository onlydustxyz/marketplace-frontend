use crate::domain::{IndexerService, Observer};
use async_trait::async_trait;
use log::{error, warn};
use std::sync::Arc;

pub struct IndexerObserver {
	indexer_service: Arc<dyn IndexerService>,
}

impl IndexerObserver {
	pub fn new(indexer_service: Arc<dyn IndexerService>) -> Self {
		Self { indexer_service }
	}
}

#[async_trait]
impl Observer for IndexerObserver {
	async fn on_reorg(&self) {
		let result = self.indexer_service.stop_indexer().await;
		match result {
			Ok(()) => warn!("[dd-id=indexer-stopped] Indexer stopped due to Reorg"),
			Err(e) => error!("Failed to stop indexer: {}", e),
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use crate::domain::MockIndexerService;
	use log::{self, Level};
	use rstest::*;

	#[rstest]
	async fn should_call_stop_indexer() {
		let mut mock_indexer_service = MockIndexerService::new();
		testing_logger::setup();

		mock_indexer_service.expect_stop_indexer().once().return_once(|| Ok(()));
		let indexer_observer = IndexerObserver::new(Arc::new(mock_indexer_service));

		indexer_observer.on_reorg().await;

		testing_logger::validate(|captured_logs| {
			assert_eq!(captured_logs.len(), 1);
			assert_eq!(captured_logs[0].level, Level::Warn);
		});
	}

	#[rstest]
	async fn should_log_error() {
		let mut mock_indexer_service = MockIndexerService::new();
		testing_logger::setup();

		mock_indexer_service
			.expect_stop_indexer()
			.once()
			.return_once(|| Err(anyhow::Error::msg("Something happened!!")));
		let indexer_observer = IndexerObserver::new(Arc::new(mock_indexer_service));

		indexer_observer.on_reorg().await;

		testing_logger::validate(|captured_logs| {
			assert_eq!(captured_logs.len(), 1);
			assert_eq!(captured_logs[0].level, Level::Error);
		});
	}
}
