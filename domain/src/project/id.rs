use derive_more::{AsRef, Display, From, Into};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

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
pub struct Id(Uuid);
