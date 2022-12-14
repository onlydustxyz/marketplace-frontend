use derive_more::Constructor;
use juniper::GraphQLObject;

use crate::domain::{GithubFile, GithubUser};

#[derive(Constructor, GraphQLObject)]
pub struct Repository {
	id: i32,
	owner: String,
	name: String,
	contributors: Vec<GithubUser>,
	readme: GithubFile,
}
