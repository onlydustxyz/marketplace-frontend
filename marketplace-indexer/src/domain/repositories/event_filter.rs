use crate::domain::EventFilter;

#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {
	#[error("Event filter already exists")]
	AlreadyExists(#[source] anyhow::Error),
	#[error("Something happened at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn insert_if_not_exist(&self, event_filter: EventFilter) -> Result<(), Error>;
	fn matches(&self, event_filter: &EventFilter) -> Result<bool, Error>;
}
