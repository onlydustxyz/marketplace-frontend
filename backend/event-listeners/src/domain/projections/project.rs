use derive_more::Constructor;
use domain::ProjectId;
use infrastructure::database::schema::projects;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct Project {
	id: ProjectId,
	name: String,
	github_repo_id: i64,
	pub total_spent_amount_in_usd: i64,
}
