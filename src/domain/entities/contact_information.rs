use super::ContributorId;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use wrappers::UuidWrapper;

#[derive(
	Debug,
	Clone,
	Copy,
	PartialEq,
	Eq,
	Hash,
	Serialize,
	Deserialize,
	JsonSchema,
	UuidWrapper,
	Default,
)]
pub struct Id(Uuid);

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct ContactInformation {
	pub id: Id,
	pub contributor_id: ContributorId,
	pub discord_handle: Option<String>,
}
