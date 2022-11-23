use crate::aggregate_root;
use thiserror::Error;

mod aggregate_exists;
pub use aggregate_exists::{PaymentRequestExists, ProjectExists};

#[cfg(test)]
pub use aggregate_exists::{MockPaymentRequestExists, MockProjectExists};

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	EventStore(aggregate_root::Error),
}
