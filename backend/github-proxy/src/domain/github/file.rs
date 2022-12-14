use derive_more::Constructor;
use juniper::{GraphQLEnum, GraphQLObject};

use crate::domain::GithubUser;

#[derive(Constructor, GraphQLObject)]
pub struct Repository {
	id: i32,
	owner: String,
	name: String,
	contributors: Vec<GithubUser>,
	readme: File,
}

#[derive(Constructor, GraphQLObject)]
pub struct File {
	encoding: Encoding,
	content: String,
}

#[derive(GraphQLEnum)]
pub enum Encoding {
	Base64,
}
