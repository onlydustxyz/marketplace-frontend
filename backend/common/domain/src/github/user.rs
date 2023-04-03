use derive_getters::Getters;
use derive_new::new;
use juniper::GraphQLObject;
use url::Url;

#[derive(new, Debug, Clone, Getters, GraphQLObject)]
pub struct User {
	id: i32,
	login: String,
	avatar_url: Url,
	html_url: Url,
}
