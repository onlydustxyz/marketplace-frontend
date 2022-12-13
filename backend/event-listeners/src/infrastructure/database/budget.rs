use crate::domain::Budget;
use derive_more::Constructor;
use infrastructure::database::{schema::budgets::dsl, Client};
use std::sync::Arc;

#[derive(DieselRepository, Constructor)]
#[entity(Budget)]
#[table(dsl::budgets)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
