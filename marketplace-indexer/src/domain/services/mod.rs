mod indexing;
pub use indexing::{Error as IndexingServiceError, Service as IndexingService};

#[cfg(test)]
pub use indexing::MockService as MockIndexingService;
