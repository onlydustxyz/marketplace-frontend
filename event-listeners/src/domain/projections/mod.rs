#[allow(clippy::extra_unused_lifetimes)]
mod payment;
#[allow(clippy::extra_unused_lifetimes)]
mod payment_request;
#[allow(clippy::extra_unused_lifetimes)]
mod project;
#[allow(clippy::extra_unused_lifetimes)]
mod project_lead;

pub use payment::Payment;
pub use payment_request::PaymentRequest;
pub use project::Project;
pub use project_lead::{ProjectLead, Repository as ProjectLeadRepository};

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
