use crate::ProjectDetails;
use infrastructure::database::{schema::project_details::dsl, Client};
use std::sync::Arc;

#[derive(DieselRepository, new)]
#[entity(ProjectDetails)]
#[table(dsl::project_details)]
#[id(dsl::project_id)]
pub struct Repository(Arc<Client>);
