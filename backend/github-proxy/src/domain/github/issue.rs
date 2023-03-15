#![allow(clippy::too_many_arguments)]

use chrono::{DateTime, Utc};
use derive_more::Constructor;
use juniper::{GraphQLEnum, GraphQLObject};
use url::Url;

#[derive(GraphQLEnum)]
pub enum Status {
	Open,
	Closed,
	Merged,
}

#[derive(Constructor, GraphQLObject)]
pub struct Issue {
	id: i32,
	number: i32,
	title: String,
	html_url: Url,
	repository_url: Url,
	status: Status,
	created_at: DateTime<Utc>,
	merged_at: Option<DateTime<Utc>>,
	closed_at: Option<DateTime<Utc>>,
}
