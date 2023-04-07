use chrono::{DateTime, Utc};
use juniper::{GraphQLEnum, GraphQLInputObject};

#[derive(Debug, Default, Clone, Copy, GraphQLInputObject)]
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
