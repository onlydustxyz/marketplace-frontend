mod indexing;
pub use indexing::{Error as IndexingServiceError, Service as IndexingService};

mod indexer;
pub use indexer::Service as IndexerService;

#[cfg(test)]
pub use indexer::MockService as MockIndexerService;

#[cfg(test)]
pub use indexing::MockService as MockIndexingService;
