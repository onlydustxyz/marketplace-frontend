use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::projects::dsl, Client};

use crate::domain::Project;

#[derive(DieselRepository, Constructor)]
#[features(select, insert, delete)]
#[entity(Project)]
#[table(dsl::projects)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);
