#![allow(non_camel_case_types)]

pub type uuid = ::uuid::Uuid;
pub use url::Url;
pub type DateTimeUtc = chrono::DateTime<chrono::Utc>;
pub use domain::{GithubRepoId, GithubUserId};
