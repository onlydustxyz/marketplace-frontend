use super::Projection;
use derive_more::Constructor;
use domain::Entity;
use infrastructure::database::schema::projects;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct Project {
	id: Uuid,
	name: String,
	github_repo_id: i64,
}

impl Entity for Project {
	type Id = Uuid;
}

impl Projection for Project {}
