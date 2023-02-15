use derive_more::Constructor;
use domain::ProjectId;
use infrastructure::database::schema::projects;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct Project {
	id: ProjectId,
	github_repo_id: i64,
}
