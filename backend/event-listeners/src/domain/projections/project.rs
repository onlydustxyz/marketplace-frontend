use derive_more::Constructor;
use domain::ProjectId;
use infrastructure::database::schema::projects;

#[derive(Debug, Insertable, Identifiable, Queryable, Constructor)]
pub struct Project {
	id: ProjectId,
}
