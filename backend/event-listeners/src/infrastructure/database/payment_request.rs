use crate::domain::PaymentRequest;
use derive_more::Constructor;
use infrastructure::database::{schema::payment_requests::dsl, Client};
use std::sync::Arc;

#[derive(DieselRepository, Constructor)]
#[entity(PaymentRequest)]
#[table(dsl::payment_requests)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
