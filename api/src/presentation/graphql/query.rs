use super::Context;
use juniper::graphql_object;

pub struct Query;

#[graphql_object(context=Context)]
impl Query {
	pub fn new() -> Self {
		Self {}
	}

	pub fn hello(&self) -> &str {
		"Couscous!"
	}
}
