use derive_getters::Getters;
use derive_new::new;
use juniper::GraphQLObject;
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
