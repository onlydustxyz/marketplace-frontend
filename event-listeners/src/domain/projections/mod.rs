#[allow(clippy::extra_unused_lifetimes)]
mod payment;
#[allow(clippy::extra_unused_lifetimes)]
mod payment_request;

pub use payment::Payment;
pub use payment_request::PaymentRequest;

pub trait Projection {
	type Id;
}

use anyhow::Result;
pub trait Repository<P: Projection>: Send + Sync {
	fn insert(&self, projection: &P) -> Result<()>;
	fn update(&self, id: &P::Id, projection: &P) -> Result<()>;
	fn delete(&self, id: &P::Id) -> Result<()>;
	fn clear(&self) -> Result<()>;
}
