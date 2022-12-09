use crate::domain::GithubUser;
use derive_more::Constructor;
use juniper::GraphQLObject;

#[derive(Constructor, GraphQLObject)]
pub struct Repository {
	id: i32,
	owner: String,
	name: String,
	contributors: Vec<GithubUser>,
}
