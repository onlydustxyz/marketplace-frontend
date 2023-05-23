//! This file contains an implementation of the `GithubFetchRepoService` trait for the `github::Client` struct.
//!
//! [`GithubFetchRepoService`] is a trait that defines methods to fetch information about GitHub repositories.
//!
//! [`github::Client`] is a client for the GitHub REST API.
//!
//! The implementation uses the `async_trait` attribute to define the async methods of the trait.
//!
//! The [`tracing::instrument`] attribute is used to instrument the methods for logging with tracing.
//!
//! The [Arc] pointer is used to share ownership of the filters argument, avoiding unnecessary cloning.
//!
//! # Examples
//!
//! ```
//! use std::sync::Arc;
//!
//! use domain::GithubRepoId;
//! use async_trait::async_trait;
//!
//! use crate::github;
//!
//! #[derive(Debug, Default)]
//! pub struct GithubRepo;
//!
//! #[derive(Debug, Default)]
//! pub struct GithubRepoLanguages;
//!
//! #[derive(Debug, Default)]
//! pub struct GithubUser;
//!
//! #[derive(Debug)]
//! pub enum GithubServiceError {
//!     Other,
//! }
//!
//! type GithubServiceResult<T> = Result<T, GithubServiceError>;
//!
//! #[async_trait]
//! pub trait GithubFetchRepoService {
//!     async fn repo_by_id(&self, id: &GithubRepoId) -> GithubServiceResult<GithubRepo>;
//!
//!     async fn repo_languages(&self, id: &GithubRepoId) -> GithubServiceResult<GithubRepoLanguages>;
//!
//!     async fn repo_contributors(&self, repo_id: &GithubRepoId, filters: Arc<dyn StreamFilter<Item = GithubUser>>) -> GithubServiceResult<Vec<GithubUser>>;
//! }
//!
//! #[async_trait]
//! impl GithubFetchRepoService for github::Client {
//!     #[tracing::instrument(skip(self))]
//!     async fn repo_by_id(&self, id: &GithubRepoId) -> GithubServiceResult<GithubRepo> {
//!         let repo = self.get_repository_by_id(id).await?;
//!         let repo = OctocrabRepo::from(repo).try_into().map_err(GithubServiceError::Other)?;
//!         Ok(repo)
//!     }
//!
//!     #[tracing::instrument(skip(self))]
//!     async fn repo_languages(&self, id: &GithubRepoId) -> GithubServiceResult<GithubRepoLanguages> {
//!         let languages = self.get_languages_by_repository_id(id).await?;
//!         Ok(languages)
//!     }
//!
//!     #[tracing::instrument(skip(self, filters))]
//!     async fn repo_contributors(
//!         &self,
//!         repo_id: &GithubRepoId,
//!         filters: Arc<dyn StreamFilter<Item = GithubUser>>,
//!     ) -> GithubServiceResult<Vec<GithubUser>> {
//!         let users = self.get_contributors_by_repository_id(repo_id, filters).await?;
//!         Ok(users)
//!     }
//! }
//! ```

use std::sync::Arc;

use async_trait::async_trait;
use domain::{
    stream_filter, GithubFetchRepoService, GithubRepo, GithubRepoId, GithubRepoLanguages,
    GithubServiceError, GithubServiceResult, GithubUser,
};
use tracing::instrument;

use crate::github::{self, OctocrabRepo};

#[async_trait]
impl GithubFetchRepoService for github::Client {
    /// Fetches a repository by its ID.
    ///
    /// The method returns a [`GithubRepo`] instance or an `GithubServiceError` if there's an error fetching the repository.
    ///
    /// # Examples
    ///
    /// ```
    /// # use std::sync::Arc;
    /// #
    /// # use domain::{GithubRepoId, GithubRepo};
    /// # use async_trait::async_trait;
    /// #
    /// # use crate::github::{self, OctocrabRepo};
    ///
    /// # #[async_trait]
    /// # pub trait GithubFetchRepoService {
    /// #     async fn repo_by_id(&self, id: &GithubRepoId) -> Result<GithubRepo, ()>;
    /// # }
    /// #
    /// # impl GithubFetchRepoService for github::Client {
    ///     #[instrument(skip(self))]
    ///     async fn repo_by_id(&self, id: &GithubRepoId) -> Result<GithubRepo, ()> {
    ///         let repo = self.get_repository_by_id(id).await?;
    ///         let repo = OctocrabRepo::from(repo).try_into().map_err(|_| ())?;
    ///         Ok(repo)
    ///     }
    /// # }
    /// ```
    #[instrument(skip(self))]
    async fn repo_by_id(&self, id: &GithubRepoId) -> GithubServiceResult<GithubRepo> {
        let repo = self.get_repository_by_id(id).await?;
        let repo = OctocrabRepo::from(repo).try_into().map_err(GithubServiceError::Other)?;
        Ok(repo)
    }

    /// Fetches the languages for a repository.
    ///
    /// The method returns a [`GithubRepoLanguages`] instance or an `GithubServiceError` if there's an error fetching the languages.
    ///
    /// # Examples
    ///
    /// ```
    /// # use std::sync::Arc;
    /// #
    /// # use domain::{GithubRepoId, GithubRepoLanguages};
    /// # use async_trait::async_trait;
    /// #
    /// # use crate::github::github::Client;
    ///
    /// # #[async_trait]
    /// # pub trait GithubFetchRepoService {
    /// #     async fn repo_languages(&self, id: &GithubRepoId) -> Result<GithubRepoLanguages, ()>;
    /// # }
    /// #
    /// # impl GithubFetchRepoService for Client {
    ///     #[instrument(skip(self))]
    ///     async fn repo_languages(&self, id: &GithubRepoId) -> Result<GithubRepoLanguages, ()> {
    ///         let languages = self.get_languages_by_repository_id(id).await?;
    ///         Ok(languages)
    ///     }
    /// # }
    /// ```
    #[instrument(skip(self))]
    async fn repo_languages(&self, id: &GithubRepoId) -> GithubServiceResult<GithubRepoLanguages> {
        let languages = self.get_languages_by_repository_id(id).await?;
        Ok(languages)
    }

    /// Fetches the contributors for a repository.
    ///
    /// The method returns a [`Vec<GithubUser>`] instance or an `GithubServiceError` if there's an error fetching the contributors.
    ///
    /// The `filters` argument is an [Arc] pointer to a [`dyn stream_filter::Filter`] trait object.
    ///
    /// # Examples
    ///
    /// ```
    /// # use std::sync::Arc;
    /// #
    /// # use domain::{GithubRepoId, GithubUser};
    /// # use async_trait::async_trait;
    /// #
    /// # use crate::github::github::{Client, self};
    ///
    /// # #[async_trait]
    /// # pub trait GithubFetchRepoService {
    /// #     async fn repo_contributors(
    /// #         &self,
    /// #         repo_id: &GithubRepoId,
    /// #         filters: Arc<dyn stream_filter::Filter<Item = GithubUser>>,
    /// #     ) -> Result<Vec<GithubUser>, ()>;
    /// # }
    /// #
    /// # impl GithubFetchRepoService for Client {
    ///     #[instrument(skip(self, filters))]
    ///     async fn repo_contributors(
    ///         &self,
    ///         repo_id: &GithubRepoId,
    ///         filters: Arc<dyn stream_filter::Filter<Item = GithubUser>>,
    ///     ) -> Result<Vec<GithubUser>, ()> {
    ///         let users = self.get_contributors_by_repository_id(repo_id, filters).await?;
    ///         Ok(users)
    ///     }
    /// # }
    /// ```
    #[instrument(skip(self, filters))]
    async fn repo_contributors(
        &self,
        repo_id: &GithubRepoId,
        filters: Arc<dyn stream_filter::Filter<Item = GithubUser>>,
    ) -> GithubServiceResult<Vec<GithubUser>> {
        let users = self.get_contributors_by_repository_id(repo_id, filters).await?;
        Ok(users)
    }
}