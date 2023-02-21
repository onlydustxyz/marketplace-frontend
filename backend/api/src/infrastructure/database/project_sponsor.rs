use std::sync::Arc;

use derive_more::Constructor;
use domain::Project;
use infrastructure::database::{schema::projects_sponsors::dsl, Client};

use crate::domain::Sponsor;

#[derive(DieselMappingRepository, Constructor, Clone)]
#[entities((Project, Sponsor))]
#[ids((dsl::project_id, dsl::sponsor_id))]
#[table(dsl::projects_sponsors)]
#[mock]
pub struct Repository(Arc<Client>);
