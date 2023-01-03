use juniper::{graphql_object, DefaultScalarValue};

use super::{Context, Result};
use crate::domain::{GithubRepository, GithubUser};

pub struct Query;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Query {
	pub fn hello_from_github_proxy(&self) -> &str {
		"Raclette!"
	}

	pub async fn fetch_repository_details(
		&self,
		context: &Context,
		id: i32,
	) -> Result<GithubRepository> {
		let repository = context.github_service.fetch_repository_by_id(id as u64).await?;
		Ok(repository)
	}

	pub async fn fetch_user_details(
		&self,
		context: &Context,
		username: String,
	) -> Result<GithubUser> {
		let user = context.github_service.fetch_user_by_name(&username).await?;
		Ok(user)
	}
}
