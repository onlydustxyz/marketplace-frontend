use chrono::{DateTime, Utc};
use derive_getters::Getters;
use derive_new::new;
use juniper::{GraphQLEnum, GraphQLObject};
use url::Url;

use crate::{GithubRepositoryId, GithubUser};

#[derive(Clone, Debug, GraphQLEnum)]
pub enum Status {
	Open,
	Closed,
	Merged,
	Completed,
	Cancelled,
}

#[derive(Clone, Debug, GraphQLEnum)]
pub enum Type {
	Issue,
	PullRequest,
}

#[allow(clippy::too_many_arguments)]
#[derive(Clone, Debug, new, Getters, GraphQLObject)]
pub struct Issue {
	id: i32,
	repo_id: GithubRepositoryId,
	number: i32,
	r#type: Type,
	title: String,
	author: GithubUser,
	html_url: Url,
	status: Status,
	created_at: DateTime<Utc>,
	merged_at: Option<DateTime<Utc>>,
	closed_at: Option<DateTime<Utc>>,
}
