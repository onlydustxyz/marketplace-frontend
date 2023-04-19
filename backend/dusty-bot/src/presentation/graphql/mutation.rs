use juniper::graphql_object;

use super::Context;

pub struct Mutation;

#[graphql_object(context=Context)]
impl Mutation {
	pub fn new() -> Self {
		Self {}
	}
}
