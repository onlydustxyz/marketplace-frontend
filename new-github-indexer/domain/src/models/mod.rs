use std::collections::HashMap;

pub use octocrab_indexer::models::{Author as User, *};
use url::Url;

pub mod indexed;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct Languages(HashMap<String, i32>);

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize, PartialOrd, Ord)]
pub enum CiChecks {
	Passed,
	Failed,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, PartialOrd, Ord)]
pub struct SocialAccount {
	provider: String,
	url: Url,
}
