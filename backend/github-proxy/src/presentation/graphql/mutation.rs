use juniper::{graphql_object, DefaultScalarValue};

use super::{Context, Result};
use crate::domain::GithubIssue;

pub struct Mutation;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Mutation {
	pub async fn create_issue(
		&self,
		context: &Context,
		repo_owner: String,
		repo_name: String,
		title: String,
		description: String,
		assignees: Vec<String>,
	) -> Result<GithubIssue> {
		let issue = context
			.github_service()?
			.create_issue(&repo_owner, &repo_name, &title, &description, assignees)
			.await?;
		Ok(issue)
	}
}
