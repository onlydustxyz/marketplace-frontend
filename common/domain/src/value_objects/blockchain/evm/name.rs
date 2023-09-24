use derive_more::Constructor;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Constructor)]
#[serde(transparent)]
pub struct Name(String);

impl Name {
	pub fn as_str(&self) -> &str {
		self.0.as_str()
	}
}

impl ToString for Name {
	fn to_string(&self) -> String {
		self.0.to_string()
	}
}
