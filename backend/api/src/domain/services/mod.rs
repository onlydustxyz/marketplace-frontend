mod github;
#[cfg(test)]
pub use github::MockService as MockGithubService;
pub use github::{Error as GithubServiceError, Service as GithubService};

mod image_store;
#[cfg(test)]
pub use image_store::MockService as MockImageStoreService;
pub use image_store::{Error as ImageStoreServiceError, Service as ImageStoreService};
