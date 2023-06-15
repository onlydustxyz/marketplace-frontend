use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::user_profile_info::dsl, user_profile::UserProfile, Client};

#[derive(DieselRepository, Constructor, Clone)]
#[entity(UserProfile)]
#[table(dsl::user_profile_info)]
#[id(dsl::id)]
#[mock]
pub struct Repository(Arc<Client>);
