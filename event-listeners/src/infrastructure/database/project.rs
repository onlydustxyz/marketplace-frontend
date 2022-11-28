use std::sync::Arc;

use crate::domain::Project;
use infrastructure::database::{schema::projects::dsl, Client};

#[derive(DieselRepository, new)]
#[entity(Project)]
#[table(dsl::projects)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
