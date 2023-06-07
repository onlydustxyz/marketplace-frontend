use std::sync::Arc;

use chrono::NaiveDateTime;
use derive_more::Constructor;
use domain::{Project, ProjectId, User, UserId};
use infrastructure::database::{schema::project_leads::dsl, Client};

#[derive(DieselMappingRepository, Constructor)]
#[entities((Project, User))]
#[ids((dsl::project_id, dsl::user_id))]
#[table(dsl::project_leads)]
pub struct Repository(Arc<Client>);

impl Repository {
	pub fn try_insert_with_metadata(
		&self,
		project_id: &ProjectId,
		user_id: &UserId,
		assigned_at: &NaiveDateTime,
	) -> Result<(), infrastructure::database::DatabaseError> {
		let connection = self.0.connection()?;

		diesel::insert_into(dsl::project_leads)
			.values((
				dsl::project_id.eq(project_id),
				dsl::user_id.eq(user_id),
				dsl::assigned_at.eq(assigned_at),
			))
			.on_conflict_do_nothing()
			.execute(&*connection)?;

		Ok(())
	}
}
