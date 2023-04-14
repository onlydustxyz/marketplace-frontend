use derive_getters::Getters;
use derive_new::new;
use juniper::GraphQLObject;
use url::Url;

use crate::GithubUserId;

#[derive(new, Getters, GraphQLObject, Clone)]
pub struct User {
	id: GithubUserId,
	login: String,
	avatar_url: Url,
	html_url: Url,
}
