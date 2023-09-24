use serde::{Deserialize, Serialize};
use url::Url;

use super::User;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
pub struct Commit {
	pub sha: String,
	pub html_url: Url,
	pub author: User,
}
