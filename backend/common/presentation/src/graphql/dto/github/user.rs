use juniper::GraphQLObject;
use url::Url;

use super::ToInt32;

#[derive(Debug, GraphQLObject)]
#[graphql(name = "GithubUser")]
pub struct User {
	pub id: i32,
	pub login: String,
	pub avatar_url: Url,
	pub html_url: Url,
}

impl From<domain::GithubUser> for User {
	fn from(user: domain::GithubUser) -> Self {
		Self {
			id: user.id.to_i32(),
			login: user.login,
			avatar_url: user.avatar_url,
			html_url: user.html_url,
		}
	}
}
