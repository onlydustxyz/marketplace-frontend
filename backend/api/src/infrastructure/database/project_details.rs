use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::project_details::dsl, Client};

use crate::domain::ProjectDetails;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(ProjectDetails)]
#[table(dsl::project_details)]
#[id(dsl::project_id)]
pub struct Repository(Arc<Client>);
