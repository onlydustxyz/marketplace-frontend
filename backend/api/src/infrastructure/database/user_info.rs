use infrastructure::database::{schema::user_info::dsl, Client};
use std::sync::Arc;

use crate::domain::UserInfo;

#[derive(DieselRepository, new, Clone)]
#[entity(UserInfo)]
#[table(dsl::user_info)]
#[id(dsl::user_id)]
pub struct Repository(Arc<Client>);
