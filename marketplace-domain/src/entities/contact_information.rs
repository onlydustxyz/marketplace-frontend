use super::ContributorId;
use marketplace_wrappers::UuidWrapper;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, UuidWrapper, Default)]
pub struct Id(Uuid);

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct ContactInformation {
	pub id: Id,
	pub contributor_id: ContributorId,
	pub discord_handle: Option<String>,
}
