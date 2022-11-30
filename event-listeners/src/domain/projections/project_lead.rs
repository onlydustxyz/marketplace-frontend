use super::Projection;
use anyhow::Result;
use domain::Entity;
use infrastructure::database::schema::project_leads;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable)]
#[primary_key(project_id, user_id)]
pub struct ProjectLead {
	project_id: Uuid,
	user_id: Uuid,
}

impl ProjectLead {
	pub fn new(project_id: Uuid, user_id: Uuid) -> Self {
		Self {
			project_id,
			user_id,
		}
	}
}

impl Entity for ProjectLead {
	type Id = Uuid;
}

impl Projection for ProjectLead {}

pub trait Repository: Send + Sync {
	fn insert(&self, projection: &ProjectLead) -> Result<()>;
	fn delete(&self, project_id: &Uuid, leader_id: &Uuid) -> Result<()>;
	fn clear(&self) -> Result<()>;
}
