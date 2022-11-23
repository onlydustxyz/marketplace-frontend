use crate::*;
use thiserror::Error;

mod aggregate_exists;
pub use aggregate_exists::{PaymentRequestExists, ProjectExists};

#[cfg(test)]
pub use aggregate_exists::{MockPaymentRequestExists, MockProjectExists};

mod user_exists;
pub use user_exists::Specification as UserExists;

#[cfg(test)]
pub use user_exists::MockSpecification as MockUserExists;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	EventStore(aggregate_root::Error),
	#[error(transparent)]
	UserRepository(UserRepositoryError),
}
