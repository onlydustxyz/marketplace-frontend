use crate::domain::PaymentRequest;
use infrastructure::database::{schema::payment_requests::dsl, Client};
use std::sync::Arc;

#[derive(DieselRepository, new)]
#[entity(PaymentRequest)]
#[table(dsl::payment_requests)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
