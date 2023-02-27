use derive_more::Constructor;
use juniper::GraphQLObject;

use crate::domain::{GithubFile, GithubUser};

#[derive(Constructor, GraphQLObject)]
pub struct Repository {
	id: i32,
	contributors: Vec<GithubUser>,
	readme: Option<GithubFile>,
	logo_url: String,
	description: String,
	stars: i32,
	forks_count: i32,
}
