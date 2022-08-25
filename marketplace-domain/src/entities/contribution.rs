use crate::*;
use marketplace_wrappers::UuidWrapper;
use serde::{Deserialize, Serialize};
use url::Url;
use uuid::Uuid;

pub type OnChainId = String;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, UuidWrapper, Default)]
pub struct Id(Uuid);

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct Contribution {
	pub id: Id,
	pub onchain_id: OnChainId,
	pub project_id: ProjectId,
	pub contributor_id: Option<ContributorId>,
	pub title: Option<String>,
	pub description: Option<String>,
	pub status: ContributionStatus,
	pub external_link: Option<Url>,
	pub gate: u8,
	pub metadata: Metadata,
	pub validator: ContractAddress,
}

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct Metadata {
	pub difficulty: Option<String>,
	pub technology: Option<String>,
	pub duration: Option<String>,
	pub context: Option<String>,
	pub r#type: Option<String>,
}
