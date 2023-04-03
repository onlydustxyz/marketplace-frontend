use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::crm_github_repos::dsl, Client};

use crate::domain::CrmGithubRepo;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(CrmGithubRepo)]
#[table(dsl::crm_github_repos)]
#[id(dsl::id)]
#[mock]
pub struct Repository(Arc<Client>);
