use juniper::graphql_object;

use super::Context;

pub struct Query;

#[graphql_object(context=Context)]
impl Query {
	pub fn hello(&self) -> &str {
		olog::info!("So hungry!");
		"Couscous!"
	}
}
