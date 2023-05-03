use chrono::{DateTime, Utc};
use juniper::{GraphQLEnum, GraphQLInputObject};

#[derive(Debug, Default, Clone, Copy, GraphQLInputObject)]
pub struct IssueFilters {
	pub state: Option<IssueState>,
	pub created_since: Option<DateTime<Utc>>,
	pub updated_since: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Copy, GraphQLEnum, PartialEq, Eq)]
pub enum IssueState {
	Open,
	Closed,
	All,
}
