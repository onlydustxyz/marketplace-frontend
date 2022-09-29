use crate::domain::EventFilter;

#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn insert(&self, event_filter: &EventFilter) -> Result<(), Error>;
	fn matches(&self, event_filter: &EventFilter) -> Result<bool, Error>;
}
