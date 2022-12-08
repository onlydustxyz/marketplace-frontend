use super::Context;
use crate::domain::GithubRepository;
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
}
