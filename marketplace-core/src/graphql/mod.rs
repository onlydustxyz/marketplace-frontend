use juniper::graphql_object;

pub struct Query;

#[graphql_object]
impl Query {
	pub fn new() -> Self {
		Self {}
	}
}
