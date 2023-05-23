use chrono::NaiveDateTime;
use domain::{ApplicationId, ProjectId, UserId};
use infrastructure::database::schema::applications;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset)]
pub struct Application {
	pub id: ApplicationId,
	pub received_at: NaiveDateTime,
	pub project_id: ProjectId,
	pub applicant_id: UserId,
}

impl domain::Entity for Application {
	type Id = ApplicationId;
}
