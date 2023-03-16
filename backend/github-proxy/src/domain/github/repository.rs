use derive_more::Constructor;
use juniper::GraphQLObject;
use url::Url;

use crate::domain::GithubUser;

#[derive(Constructor, GraphQLObject)]
pub struct Repository {
	id: i32,
	contributors: Vec<GithubUser>,
	logo_url: Url,
	html_url: Url,
	description: String,
	stars: i32,
	forks_count: i32,
}
