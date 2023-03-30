use derive_getters::Getters;
use derive_more::Constructor;
use juniper::GraphQLObject;
use url::Url;

use crate::domain::GithubUser;

#[derive(Constructor, GraphQLObject, Getters)]
pub struct Repository {
	id: i32,
	owner: String,
	name: String,
	contributors: Vec<GithubUser>,
	logo_url: Url,
	html_url: Url,
	description: String,
	stars: i32,
	forks_count: i32,
}
