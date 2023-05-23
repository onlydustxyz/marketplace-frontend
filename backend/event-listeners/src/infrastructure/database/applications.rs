use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::applications::dsl, Client};

use crate::domain::Application;

#[derive(DieselRepository, Constructor)]
#[entity(Application)]
#[table(dsl::applications)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
