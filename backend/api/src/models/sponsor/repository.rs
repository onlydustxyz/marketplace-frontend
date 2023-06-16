use std::sync::Arc;

use derive_more::Constructor;
use infrastructure::database::{schema::sponsors::dsl, Client};

use super::Sponsor;

#[derive(DieselRepository, Constructor, Clone)]
#[entity(Sponsor)]
#[table(dsl::sponsors)]
#[id(dsl::id)]
#[mock]
pub struct Repository(Arc<Client>);
