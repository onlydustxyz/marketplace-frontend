use std::fmt::Display;

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct AccessToken(String);

impl Display for AccessToken {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		self.0.fmt(f)
	}
}

impl From<String> for AccessToken {
	fn from(str: String) -> Self {
		AccessToken(str)
	}
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct GitHubId(pub u64);

impl From<u64> for GitHubId {
	fn from(value: u64) -> Self {
		GitHubId(value)
	}
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum Identity {
	GitHubId(GitHubId),
}
