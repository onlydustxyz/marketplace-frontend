use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::github_users::dsl, Client};

use crate::domain::GithubUser;

#[derive(DieselRepository, Constructor)]
#[entity(GithubUser)]
#[table(dsl::github_users)]
#[id(dsl::id)]
#[features(insert, update)]
pub struct Repository(Arc<Client>);
