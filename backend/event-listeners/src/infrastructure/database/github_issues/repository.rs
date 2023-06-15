use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::github_issues::dsl, Client};

use super::GithubIssue;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(GithubIssue)]
#[table(dsl::github_issues)]
#[id(dsl::id)]
#[features(insert, update)]
#[mock]
pub struct Repository(Arc<Client>);
