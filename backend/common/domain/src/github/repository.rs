use std::collections::HashMap;

use derive_getters::Getters;
use derive_more::{From, Into};
use derive_new::new;
use juniper::GraphQLObject;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use url::Url;

use crate::{GithubRepositoryId, GithubUser};

#[allow(clippy::too_many_arguments)]
#[derive(new, Getters, GraphQLObject)]
pub struct Repository {
	id: GithubRepositoryId,
	owner: String,
	name: String,
	contributors: Vec<GithubUser>,
	logo_url: Url,
	html_url: Url,
	description: String,
	stars: i32,
	forks_count: i32,
}

#[derive(From, Into, Serialize, Deserialize)]
pub struct Languages(HashMap<String, i32>);

impl TryFrom<Languages> for Value {
	type Error = serde_json::Error;

	fn try_from(value: Languages) -> Result<Self, Self::Error> {
		serde_json::to_value(value.0)
	}
}
