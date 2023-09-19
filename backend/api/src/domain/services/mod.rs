mod image_store;
#[cfg(test)]
pub use image_store::MockService as MockImageStoreService;
pub use image_store::{Error as ImageStoreServiceError, Service as ImageStoreService};

mod github;
pub use github::Service as GithubService;

mod dusty_bot;
pub use self::dusty_bot::Service as DustyBotService;

pub mod indexer;

pub mod quotes;
