use crate::*;
use url::Url;

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct Contribution {
	pub id: ContributionId,
	pub project_id: ProjectId,
	pub contributor_id: Option<ContributorId>,
	pub title: Option<String>,
	pub description: Option<String>,
	pub status: ContributionStatus,
	pub external_link: Option<Url>,
	pub gate: u8,
	pub metadata: Metadata,
}

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct Metadata {
	pub difficulty: Option<String>,
	pub technology: Option<String>,
	pub duration: Option<String>,
	pub context: Option<String>,
	pub r#type: Option<String>,
}
