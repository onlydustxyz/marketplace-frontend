//! This module contains the implementation of `Indexer`
//!
//! `Indexer` is responsible for indexing Github events using `GithubFetchIssueService` and
//! storing the last update time in `GithubRepoIndexRepository`.
//!
//! # Examples
//!
//! ```
//! use std::sync::Arc;
//! use event_listeners::domain::{GithubFetchIssueService, GithubRepoId, GithubRepoIndexRepository};
//! use async_trait::async_trait;
//!
//! #[derive(new)]
//! struct Indexer {
//!     github_fetch_service: Arc<dyn GithubFetchIssueService>,
//!     github_repo_index_repository: Arc<dyn GithubRepoIndexRepository>,
//! }
//! ```