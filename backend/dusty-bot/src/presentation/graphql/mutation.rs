use domain::{GithubIssue, GithubRepositoryId};
use juniper::{graphql_object, DefaultScalarValue};

use super::{Context, Result};

pub struct Mutation;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Mutation {
	pub async fn create_issue(
		&self,
		context: &Context,
		repo_id: GithubRepositoryId,
		title: String,
		description: String,
	) -> Result<GithubIssue> {
		let issue = context.github_service.create_issue(&repo_id, &title, &description).await?;
		Ok(issue)
	}
}
