use crate::domain::Project;
use derive_more::Constructor;
use infrastructure::database::{schema::projects::dsl, Client};
use std::sync::Arc;

#[derive(DieselRepository, Constructor)]
#[entity(Project)]
#[table(dsl::projects)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
