use mockall::automock;
use thiserror::Error;

use crate::{payment_request::PaymentRequest, *};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Payment request does not exist")]
	NotFound,
	#[error("Payment request already exists")]
	AlreadyExist(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[automock]
pub trait Repository: Send + Sync {
	fn insert(&self, project: PaymentRequest) -> Result<(), Error>;
	fn find(&self, id: PaymentRequestId) -> Result<PaymentRequest, Error>;
}
