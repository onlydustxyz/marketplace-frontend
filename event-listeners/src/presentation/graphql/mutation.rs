use super::Context;
use juniper::graphql_object;

pub struct Mutation;

#[graphql_object(context=Context)]
impl Mutation {
	pub fn new() -> Self {
		Self {}
	}
}
