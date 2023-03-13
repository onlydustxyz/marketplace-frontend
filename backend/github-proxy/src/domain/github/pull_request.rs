#![allow(clippy::too_many_arguments)]

use chrono::{DateTime, Utc};
use derive_more::Constructor;
use juniper::{GraphQLEnum, GraphQLObject};

#[derive(GraphQLEnum)]
pub enum Status {
	Open,
	Closed,
	Merged,
}

#[derive(Constructor, GraphQLObject)]
pub struct PullRequest {
	id: i32,
	number: i32,
	title: String,
	assignee_id: Option<i32>,
	status: Status,
	created_at: DateTime<Utc>,
	merged_at: Option<DateTime<Utc>>,
	closed_at: Option<DateTime<Utc>>,
}
