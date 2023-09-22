use chrono::NaiveDateTime;
use diesel::Identifiable;
use domain::{ProjectId, UserId};
use infrastructure::database::schema::project_leads;

#[derive(Debug, Insertable, Identifiable, Queryable, ImmutableModel)]
#[diesel(primary_key(project_id, user_id))]
pub struct ProjectLead {
	pub project_id: ProjectId,
	pub user_id: UserId,
	pub assigned_at: NaiveDateTime,
}

impl Identifiable for ProjectLead {
	type Id = (ProjectId, UserId);

	fn id(self) -> Self::Id {
		(self.project_id, self.user_id)
	}
}
