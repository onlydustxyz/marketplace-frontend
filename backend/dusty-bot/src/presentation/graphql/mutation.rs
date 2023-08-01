use juniper::{graphql_object, DefaultScalarValue};
use presentation::graphql::dto;

use super::{Context, Result};

pub struct Mutation;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Mutation {
	pub async fn internal_create_issue(
		&self,
		context: &Context,
		repo_id: i32,
		title: String,
		description: String,
	) -> Result<dto::github::Issue> {
		let issue = context
			.github_service
			.create_issue((repo_id as i64).into(), title, description)
			.await?;
		Ok(issue.into())
	}
}
