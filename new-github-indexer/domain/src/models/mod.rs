use std::collections::HashMap;

pub use octocrab_indexer::models::{Author as User, *};
use url::Url;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct Repository {
	pub repo: octocrab_indexer::models::Repository,
	pub languages: Languages,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct Languages(HashMap<String, i32>);

impl Languages {
	pub fn get_all(&self) -> Vec<String> {
		self.0.keys().cloned().collect()
	}
}

impl TryFrom<Languages> for serde_json::Value {
	type Error = serde_json::Error;

	fn try_from(value: Languages) -> Result<Self, Self::Error> {
		serde_json::to_value(value.0)
	}
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, PartialOrd, Ord)]
pub enum CiChecks {
	Passed,
	Failed,
}

pub type SocialAccounts = Vec<SocialAccount>;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, PartialOrd, Ord)]
pub struct SocialAccount {
	provider: String,
	url: Url,
}
