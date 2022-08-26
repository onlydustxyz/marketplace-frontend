use crate::domain::*;
use marketplace_domain::ContractAddress;
use std::sync::Arc;

type Result<T> = std::result::Result<T, Error>;

/**
 * The Builder is responsible for creating an Indexer from parameters
 */
pub struct Builder {
	indexer_repository: Arc<dyn IndexerRepository>,
	network: Network,
	filters: Vec<EventFilter>,
	start_at_block: u64,
	on_conflict: OnConflictAction,
}

#[derive(Clone, Debug, PartialEq, Eq)]
enum OnConflictAction {
	DoNothing,
	Recreate,
}

impl Builder {
	/// Create a new Builder object
	pub fn new(indexer_repository: Arc<dyn IndexerRepository>) -> Self {
		Self {
			indexer_repository,
			network: Network::Starknet,
			filters: vec![],
			start_at_block: 0,
			on_conflict: OnConflictAction::DoNothing,
		}
	}

	/// Modify the network
	pub fn network(&mut self, network: Network) -> &mut Self {
		self.network = network;
		self
	}

	/// Start indexing at a given block_number
	pub fn start_at_block(&mut self, block_number: u64) -> &mut Self {
		self.start_at_block = block_number;
		self
	}

	/// Modify the network
	pub fn filter<STRING: Into<String>>(
		&mut self,
		contract_address: ContractAddress,
		event_name: STRING,
	) -> &mut Self {
		self.filters.push(EventFilter::new(contract_address, event_name));
		self
	}

	/// If the indexer we are creating already exists, do nothing
	#[allow(dead_code)]
	pub fn on_conflict_do_nothing(&mut self) -> &mut Self {
		self.on_conflict = OnConflictAction::DoNothing;
		self
	}

	/// If the indexer we are creating already exists, delete it and re-create it
	#[allow(dead_code)]
	pub fn on_conflict_recreate(&mut self) -> &mut Self {
		self.on_conflict = OnConflictAction::Recreate;
		self
	}

	/// Build the indexer
	pub async fn build(&mut self, indexer_id: IndexerId) -> Result<Indexer> {
		let existing = match self.indexer_repository.by_id(&indexer_id).await? {
			Some(indexer) => match self.on_conflict {
				OnConflictAction::Recreate => {
					self.indexer_repository.delete(&indexer.id).await?;
					None
				},
				OnConflictAction::DoNothing => Some(indexer),
			},
			None => None,
		};

		match existing {
			Some(indexer) => Ok(indexer),
			None => {
				let indexer = Indexer::new(
					indexer_id,
					self.network.clone(),
					self.start_at_block,
					self.filters.clone(),
				);
				self.indexer_repository.create(&indexer).await?;
				Ok(indexer)
			},
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;
	use std::str::FromStr;

	#[fixture]
	fn indexer_repository() -> MockIndexerRepository {
		MockIndexerRepository::new()
	}

	#[rstest]
	fn builder_can_be_created(indexer_repository: MockIndexerRepository) {
		Builder::new(Arc::new(indexer_repository));
	}

	#[rstest]
	#[tokio::test]
	async fn builder_can_create_an_indexer_with_default_values(
		mut indexer_repository: MockIndexerRepository,
	) {
		indexer_repository
			.expect_by_id()
			.with(eq(IndexerId::from("ID")))
			.returning(|_| Ok(None));

		let expected_indexer = Indexer::new("ID".into(), Network::Starknet, 0, Vec::new());

		indexer_repository
			.expect_create()
			.with(eq(expected_indexer.clone()))
			.returning(|_| Ok(()));

		let result = Builder::new(Arc::new(indexer_repository)).build("ID".into()).await;
		assert!(result.is_ok(), "{}", result.err().unwrap());

		assert_eq!(expected_indexer, result.unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn builder_can_create_an_indexer_with_parameters(
		mut indexer_repository: MockIndexerRepository,
	) {
		indexer_repository
			.expect_by_id()
			.with(eq(IndexerId::from("ID")))
			.returning(|_| Ok(None));

		let expected_indexer = Indexer::new(
			"ID".into(),
			Network::Starknet,
			1234,
			vec![
				EventFilter::new(ContractAddress::from_str("0x1234").unwrap(), "Event1"),
				EventFilter::new(ContractAddress::from_str("0x4567").unwrap(), "Event2"),
			],
		);

		indexer_repository
			.expect_create()
			.with(eq(expected_indexer.clone()))
			.returning(|_| Ok(()));

		let result = Builder::new(Arc::new(indexer_repository))
			.network(Network::Starknet)
			.start_at_block(1234)
			.filter(
				ContractAddress::from_str("0x1234").unwrap(),
				"Event1".to_owned(),
			)
			.filter(
				ContractAddress::from_str("0x4567").unwrap(),
				"Event2".to_owned(),
			)
			.build("ID".into())
			.await;

		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(expected_indexer, result.unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn on_conflict_do_nothing(mut indexer_repository: MockIndexerRepository) {
		indexer_repository
			.expect_by_id()
			.with(eq(IndexerId::from("ID")))
			.returning(|_| {
				Ok(Some(Indexer::new(
					"ID".into(),
					Network::Starknet,
					0,
					Vec::new(),
				)))
			});

		let result = Builder::new(Arc::new(indexer_repository))
			.on_conflict_do_nothing()
			.build("ID".into())
			.await;

		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn on_conflict_recreate(mut indexer_repository: MockIndexerRepository) {
		indexer_repository
			.expect_by_id()
			.with(eq(IndexerId::from("ID")))
			.returning(|_| {
				Ok(Some(Indexer::new(
					"ID".into(),
					Network::Starknet,
					0,
					Vec::new(),
				)))
			});

		indexer_repository
			.expect_delete()
			.with(eq(IndexerId::from("ID")))
			.returning(|_| Ok(()));

		indexer_repository.expect_create().returning(|_| Ok(()));

		let result = Builder::new(Arc::new(indexer_repository))
			.on_conflict_recreate()
			.build("ID".into())
			.await;

		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn builder_forward_error_on_get(mut indexer_repository: MockIndexerRepository) {
		indexer_repository
			.expect_by_id()
			.with(eq(IndexerId::from("ID")))
			.returning(|_| {
				Err(IndexerRepositoryError::GetIndexer {
					id: "ID".into(),
					details: String::new(),
				})
			});

		let result = Builder::new(Arc::new(indexer_repository)).build("ID".into()).await;
		assert!(result.is_err());
	}

	#[rstest]
	#[tokio::test]
	async fn builder_forward_error_on_create(mut indexer_repository: MockIndexerRepository) {
		indexer_repository
			.expect_by_id()
			.with(eq(IndexerId::from("ID")))
			.returning(|_| Ok(None));

		indexer_repository.expect_create().returning(|_| {
			Err(IndexerRepositoryError::CreateIndexer {
				id: "ID".into(),
				details: String::new(),
			})
		});

		let result = Builder::new(Arc::new(indexer_repository)).build("ID".into()).await;
		assert!(result.is_err());
	}

	#[rstest]
	#[tokio::test]
	async fn builder_forward_error_on_delete(mut indexer_repository: MockIndexerRepository) {
		indexer_repository
			.expect_by_id()
			.with(eq(IndexerId::from("ID")))
			.returning(|_| {
				Ok(Some(Indexer::new(
					"ID".into(),
					Network::Starknet,
					0,
					Vec::new(),
				)))
			});

		indexer_repository.expect_delete().returning(|_| {
			Err(IndexerRepositoryError::DeleteIndexer {
				id: "ID".into(),
				details: String::new(),
			})
		});

		let result = Builder::new(Arc::new(indexer_repository))
			.on_conflict_recreate()
			.build("ID".into())
			.await;
		assert!(result.is_err());
	}
}
