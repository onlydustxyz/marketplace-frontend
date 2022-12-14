use derive_more::Constructor;
use domain::{Entity, GithubRepositoryId};
use infrastructure::database::schema::github_repo_details;
use serde_json::Value;

use super::Projection;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct GithubRepoDetail {
	id: GithubRepositoryId,
	owner: String,
	name: String,
	languages: Value,
}

impl Entity for GithubRepoDetail {
	type Id = GithubRepositoryId;
}

impl Projection for GithubRepoDetail {}
