mod github_identifier_registered;
pub use github_identifier_registered::GithubIdentifierRegisteredEvent;

use serde::{Deserialize, Serialize};
use std::fmt::Display;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	GithubIdentifierRegistered(GithubIdentifierRegisteredEvent),
}

impl Display for Event {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match self {
			Self::GithubIdentifierRegistered(event) => event.fmt(f),
		}
	}
}
