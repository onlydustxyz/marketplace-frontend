use domain::ProjectId;
use infrastructure::database::schema::projects;

#[derive(Debug, Insertable, Identifiable, Queryable)]
pub struct Project {
	pub id: ProjectId,
}

impl domain::Entity for Project {
	type Id = ProjectId;
}
