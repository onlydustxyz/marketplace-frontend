use juniper::graphql_object;

use super::Context;

pub struct Query;

#[graphql_object(context=Context)]
impl Query {
	pub fn hello(&self) -> &str {
		olog::info!("So hungry!");
		"Couscous!"
	}

	pub fn release_date(&self) -> String {
		std::env::var("HEROKU_RELEASE_CREATED_AT")
			.unwrap_or_else(|_| "2023-01-01T08:00:00Z".to_string())
	}
}
