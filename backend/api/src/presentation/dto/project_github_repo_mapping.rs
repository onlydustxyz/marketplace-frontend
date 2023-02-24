use derive_more::Constructor;
use juniper::GraphQLObject;
use uuid::Uuid;

#[derive(GraphQLObject, Constructor)]
pub struct ProjectGithubRepoMapping {
	project_id: Uuid,
	github_repo_id: i32,
}
