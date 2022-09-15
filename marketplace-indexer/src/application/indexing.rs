use crate::domain::*;
use futures::future::try_join_all;
use std::sync::Arc;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Repository(#[from] IndexerRepositoryError),
	#[error(transparent)]
	Service(#[from] IndexingServiceError),
}

pub struct Usecase {
	indexer_repository: Arc<dyn IndexerRepository>,
	indexing_service: Arc<dyn IndexingService>,
	observer: Arc<dyn BlockchainObserver>,
}

impl Usecase {
	pub fn new(
		indexer_repository: Arc<dyn IndexerRepository>,
		indexing_service: Arc<dyn IndexingService>,
		observer: Arc<dyn BlockchainObserver>,
	) -> Self {
		Self {
			indexer_repository,
			indexing_service,
			observer,
		}
	}

	pub async fn run_all_indexers(&self) -> Result<(), Error> {
		let indexers = self.indexer_repository.list().await?;

		try_join_all(
			indexers.into_iter().map(|indexer| {
				self.indexing_service.fetch_new_events(indexer, self.observer.clone())
			}),
		)
		.await?;

		Ok(())
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;

	#[fixture]
	fn indexer_ids() -> Vec<IndexerId> {
		vec![
			String::from("indexer-1").into(),
			String::from("indexer-2").into(),
			String::from("indexer-3").into(),
		]
	}

	#[fixture]
	fn indexers(indexer_ids: Vec<IndexerId>) -> Vec<Indexer> {
		indexer_ids
			.into_iter()
			.map(|id| Indexer {
				id,
				..Default::default()
			})
			.collect()
	}

	#[fixture]
	fn indexer_repository() -> MockIndexerRepository {
		MockIndexerRepository::new()
	}

	#[fixture]
	fn indexing_service() -> MockIndexingService {
		MockIndexingService::new()
	}

	#[fixture]
	fn observer() -> MockBlockchainObserver {
		MockBlockchainObserver::new()
	}

	#[fixture]
	fn blockchain_observer() -> MockBlockchainObserver {
		MockBlockchainObserver::new()
	}

	#[rstest]
	async fn run_all_indexers(
		mut indexer_repository: MockIndexerRepository,
		mut indexing_service: MockIndexingService,
		indexers: Vec<Indexer>,
	) {
		let cloned_indexers = indexers.clone();
		indexer_repository.expect_list().times(1).return_once(|| Ok(cloned_indexers));

		for indexer in indexers {
			indexing_service
				.expect_fetch_new_events()
				.times(1)
				.with(eq(indexer), always())
				.returning(|_, _| Ok(()));
		}

		let usecase = Usecase::new(
			Arc::new(indexer_repository),
			Arc::new(indexing_service),
			Arc::new(MockBlockchainObserver::new()),
		);

		let result = usecase.run_all_indexers().await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}
}
