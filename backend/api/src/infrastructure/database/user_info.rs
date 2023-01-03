use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::user_info::dsl, Client};

use crate::domain::UserInfo;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(UserInfo)]
#[table(dsl::user_info)]
#[id(dsl::user_id)]
pub struct Repository(Arc<Client>);

#[cfg(test)]
mockall::mock! {
	pub Repository {
		pub fn new(client: Arc<Client>) -> Self;
		pub fn upsert(&self, entity: &UserInfo)  -> Result<(), infrastructure::database::DatabaseError>;
	}

	impl Clone for Repository {
		fn clone(&self) -> Self;
	}
}
