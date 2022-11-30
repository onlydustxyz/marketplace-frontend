#[allow(clippy::extra_unused_lifetimes)]
mod payment;
#[allow(clippy::extra_unused_lifetimes)]
mod payment_request;
#[allow(clippy::extra_unused_lifetimes)]
mod project;
#[allow(clippy::extra_unused_lifetimes)]
mod project_lead;

use domain::Entity;
pub use payment::Payment;
pub use payment_request::PaymentRequest;
pub use project::Project;
pub use project_lead::{ProjectLead, Repository as ProjectLeadRepository};

pub trait Projection: Entity {}
