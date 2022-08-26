use crate::*;
use url::Url;

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct WithGithubData {
	pub id: ContributionId,
	// Contribution state
	pub project_id: ProjectId,
	pub github_issue_number: u32,
	pub status: ContributionStatus,
	pub contributor_id: Option<ContributorId>,
	pub gate: u8,
	// Github data
	pub title: Option<String>,
	pub description: Option<String>,
	pub external_link: Option<Url>,
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
