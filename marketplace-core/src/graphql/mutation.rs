use juniper::graphql_object;

pub struct Mutation;

#[graphql_object]
impl Mutation {
	pub fn new() -> Self {
		Self {}
	}
}
