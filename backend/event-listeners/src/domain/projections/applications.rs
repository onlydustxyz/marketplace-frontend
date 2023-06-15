use chrono::NaiveDateTime;
use diesel::Identifiable;
use domain::{ApplicationId, ProjectId, UserId};
use infrastructure::database::schema::applications;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model)]
pub struct Application {
	pub id: ApplicationId,
	pub received_at: NaiveDateTime,
	pub project_id: ProjectId,
	pub applicant_id: UserId,
}

impl Identifiable for Application {
	type Id = ApplicationId;

	fn id(self) -> Self::Id {
		self.id
	}
}
