use derive_more::Constructor;
use domain::GithubRepositoryId;
use infrastructure::database::schema::github_repo_details;
use serde_json::Value;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct GithubRepoDetail {
	id: GithubRepositoryId,
	owner: String,
	name: String,
	languages: Value,
}
