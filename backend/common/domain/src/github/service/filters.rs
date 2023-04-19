use chrono::{DateTime, Utc};
use derive_new::new;
use juniper::{GraphQLEnum, GraphQLInputObject};

#[derive(Debug, Default, Clone, Copy, GraphQLInputObject, new)]
pub struct Filters {
	pub state: Option<State>,
	pub created_since: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Copy, GraphQLEnum, PartialEq, Eq)]
pub enum State {
	Open,
	Closed,
	Merged,
	All,
}
