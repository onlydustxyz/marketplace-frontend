use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::payment_requests::dsl, Client};

use crate::domain::PaymentRequest;

#[derive(DieselRepository, Constructor)]
#[entity(PaymentRequest)]
#[table(dsl::payment_requests)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
