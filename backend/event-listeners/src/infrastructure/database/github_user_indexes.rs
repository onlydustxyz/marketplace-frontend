use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::github_user_indexes::dsl, Client};

use crate::domain::GithubUserIndex;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(GithubUserIndex)]
#[table(dsl::github_user_indexes)]
#[id(dsl::user_id)]
#[mock]
pub struct Repository(Arc<Client>);
