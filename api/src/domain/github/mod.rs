use derive_more::{AsRef, Display, From, Into};
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Clone,
	Copy,
	Default,
	Serialize,
	Deserialize,
	PartialEq,
	Eq,
	Display,
	From,
	Into,
	AsRef,
	Hash,
)]
pub struct GithubRepositoryId(i64);
