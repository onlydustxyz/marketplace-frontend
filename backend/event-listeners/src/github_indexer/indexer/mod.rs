pub mod composite;
pub mod contributors;
mod error;
pub mod full_pull_requests;
pub mod issues;
pub mod logged;
pub mod published;
pub mod pull_requests;
pub mod rate_limited;
pub mod repo;
mod repository;
pub mod user;
pub mod with_state;

use std::{
	collections::hash_map::DefaultHasher,
	fmt::Display,
	hash::{Hash, Hasher},
};

use async_trait::async_trait;
use error::{Error, Result};
pub use repository::Repository;

use crate::listeners::github::Event as GithubEvent;

pub trait Stateful<Id> {
	fn store(&self, id: Id, events: &[GithubEvent]) -> anyhow::Result<()>;
}

pub fn hash<T: Hash>(t: &T) -> u64 {
	let mut s = DefaultHasher::new();
	t.hash(&mut s);
	s.finish()
}

#[async_trait]
pub trait Indexer<Id>: Send + Sync
where
	Id: Indexable,
{
	fn name(&self) -> String;
	async fn index(&self, id: Id) -> Result<Vec<GithubEvent>>;
}

pub trait Indexable: Clone + Display + Send {}

impl<I: Clone + Display + Send> Indexable for I {}
