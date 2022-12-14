use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::budgets::dsl, Client};

use crate::domain::Budget;

#[derive(DieselRepository, Constructor)]
#[entity(Budget)]
#[table(dsl::budgets)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
