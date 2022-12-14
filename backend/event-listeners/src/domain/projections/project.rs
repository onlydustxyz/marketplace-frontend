use derive_more::Constructor;
use domain::{Entity, ProjectId};
use infrastructure::database::schema::projects;

use super::Projection;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct Project {
	id: ProjectId,
	name: String,
	github_repo_id: i64,
}

impl Entity for Project {
	type Id = ProjectId;
}

impl Projection for Project {}
