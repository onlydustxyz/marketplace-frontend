use crate::domain::Project;
use infrastructure::database::{schema::projects::dsl, Client};
use std::sync::Arc;

#[derive(DieselRepository, new)]
#[entity(Project)]
#[table(dsl::projects)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
