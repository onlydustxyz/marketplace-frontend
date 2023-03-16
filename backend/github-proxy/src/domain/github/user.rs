use derive_more::Constructor;
use juniper::GraphQLObject;
use url::Url;

#[derive(Constructor, GraphQLObject)]
pub struct User {
	id: i32,
	login: String,
	avatar_url: Url,
	html_url: Url,
}
