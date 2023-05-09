use domain::GithubRepoId;
use event_listeners::domain::Indexer;

use super::{IgnoreIndexerErrors, Result, Stateful};

pub mod contributors;
pub mod issues;
#[allow(clippy::module_inception)]
pub mod repo;

pub trait RepoIndexer: super::Indexer<Id = GithubRepoId> {}

impl<I: Indexer<Id = GithubRepoId>> RepoIndexer for I {}
