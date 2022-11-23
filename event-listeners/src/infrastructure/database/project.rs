use std::sync::Arc;

use crate::domain::Project;
use infrastructure::database::{schema::projects::dsl, Client};

#[derive(DieselRepository)]
#[projection(Project)]
#[table(dsl::projects)]
#[id(dsl::id)]
pub struct Repository(Arc<Client>);

impl Repository {
	pub fn new(client: Arc<Client>) -> Self {
		Self(client)
	}
}
