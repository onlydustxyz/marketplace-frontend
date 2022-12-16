use juniper::graphql_object;
use tracing::instrument;

use super::Context;

pub struct Query;

#[graphql_object(context=Context)]
impl Query {
	pub fn new() -> Self {
		Self {}
	}

	pub fn hello(&self) -> &str {
		InstrumentableQuery::hello()
	}
}

pub struct InstrumentableQuery;

impl InstrumentableQuery {
	#[instrument]
	pub fn hello() -> &'static str {
		olog::info!("So hungry!");
		"Couscous!"
	}
}
