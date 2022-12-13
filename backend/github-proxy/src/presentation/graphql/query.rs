use super::Context;
use crate::domain::{GithubRepository, GithubUser};
use juniper::{graphql_object, FieldResult};

pub struct Query;

#[graphql_object(context=Context)]
impl Query {
	pub fn hello_from_github_proxy(&self) -> &str {
		"Raclette!"
	}

	pub async fn fetch_repository_details(
		&self,
		context: &Context,
		id: i32,
	) -> FieldResult<GithubRepository> {
		let repository = context.github_service.fetch_repository_by_id(id as u64).await?;
		Ok(repository)
	}

	pub async fn fetch_user_details(
		&self,
		context: &Context,
		username: String,
	) -> FieldResult<GithubUser> {
		let user = context.github_service.fetch_user_by_name(&username).await?;
		Ok(user)
	}
}
