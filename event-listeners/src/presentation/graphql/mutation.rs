use super::Context;
use juniper::{graphql_object, FieldResult};

pub struct Mutation;

#[graphql_object(context=Context)]
impl Mutation {
	pub fn new() -> Self {
		Self {}
	}

	pub async fn refresh_contributors(context: &Context) -> FieldResult<i32> {
		context.refresh_contributors_usecase.refresh_projection_from_events().await?;
		Ok(1)
	}
}
