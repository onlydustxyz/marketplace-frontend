use serde::{Deserialize, Serialize};
use url::Url;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
	pub id: u64,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum PullRequestStatus {
	Open,
	Closed,
	Merged,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UserResponse {
	pub id: i64,
	pub login: String,
	pub avatar_url: Url,
	pub html_url: Url,
}

impl From<domain::GithubUser> for UserResponse {
	fn from(user: domain::GithubUser) -> Self {
		Self {
			id: user.id.into(),
			login: user.login,
			avatar_url: user.avatar_url,
			html_url: user.html_url,
		}
	}
}
