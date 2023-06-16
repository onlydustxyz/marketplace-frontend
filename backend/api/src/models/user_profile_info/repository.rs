use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::user_profile_info::dsl, Client};

use super::UserProfileInfo;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(UserProfileInfo)]
#[table(dsl::user_profile_info)]
#[id(dsl::id)]
#[mock]
pub struct Repository(Arc<Client>);
