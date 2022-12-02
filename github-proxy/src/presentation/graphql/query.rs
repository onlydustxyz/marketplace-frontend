use super::Context;
use juniper::graphql_object;

pub struct Query;

#[graphql_object(context=Context)]
impl Query {
	pub fn hello_from_github_proxy(&self) -> &str {
		"Raclette!"
	}
}
