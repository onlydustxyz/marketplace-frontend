use std::sync::Arc;

use crate::{
	diesel::{ExpressionMethods, RunQueryDsl},
	domain::{ProjectLead, ProjectLeadRepository},
};
use infrastructure::database::{schema::project_leads::dsl, Client};
use uuid::Uuid;

#[derive(new)]
pub struct Repository(Arc<Client>);

impl ProjectLeadRepository for Repository {
	fn insert(&self, projection: &ProjectLead) -> anyhow::Result<()> {
		let connection = self.0.connection()?;
		diesel::insert_into(dsl::project_leads)
			.values(projection)
			.execute(&*connection)?;
		Ok(())
	}

	fn delete(&self, project_id: &Uuid, leader_id: &Uuid) -> anyhow::Result<()> {
		let connection = self.0.connection()?;
		diesel::delete(dsl::project_leads)
			.filter(dsl::project_id.eq(project_id))
			.filter(dsl::user_id.eq(leader_id))
			.execute(&*connection)?;
		Ok(())
	}

	fn clear(&self) -> anyhow::Result<()> {
		let connection = self.0.connection()?;
		diesel::delete(dsl::project_leads).execute(&*connection)?;
		Ok(())
	}
}
