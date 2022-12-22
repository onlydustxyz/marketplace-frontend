use derive_more::Constructor;
use juniper::GraphQLObject;

use crate::domain::{GithubFile, GithubUser};

#[derive(Constructor, GraphQLObject)]
pub struct Repository {
	contributors: Vec<GithubUser>,
	readme: Option<GithubFile>,
	logo_url: String,
}
