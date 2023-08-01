use domain::{GithubIssue, GithubRepoId};
use juniper::{graphql_object, DefaultScalarValue};

use super::{Context, Result};

pub struct Mutation;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Mutation {
	pub async fn internal_create_issue(
		&self,
		context: &Context,
		repo_id: GithubRepoId,
		title: String,
		description: String,
	) -> Result<GithubIssue> {
		let issue = context.github_service.create_issue(repo_id, title, description).await?;
		Ok(issue)
	}
}
