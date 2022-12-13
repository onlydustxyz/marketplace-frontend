use std::sync::Arc;

use derive_more::Constructor;

use infrastructure::database::{schema::user_info::dsl, Client};

use crate::domain::UserInfo;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(UserInfo)]
#[table(dsl::user_info)]
#[id(dsl::user_id)]
pub struct Repository(Arc<Client>);
