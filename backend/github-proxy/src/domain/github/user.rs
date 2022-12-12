use derive_more::Constructor;
use juniper::GraphQLObject;

#[derive(Constructor, GraphQLObject)]
pub struct User {
	id: i32,
	login: String,
	avatar_url: String,
}
