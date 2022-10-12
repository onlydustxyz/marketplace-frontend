use std::sync::Arc;

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use marketplace_domain::{ContributionProjection, ContributorProjectionRepository};

#[derive(Deserialize, Serialize, JsonSchema)]
pub struct ContributionCreation {
	github_issue_number: u64,
	project_id: u64,
	gate: u8,
}

impl ContributionCreation {
	pub fn new(github_issue_number: u64, project_id: u64, gate: u8) -> Self {
		Self {
			github_issue_number,
			project_id,
			gate,
		}
	}

	pub fn github_issue_number(&self) -> u64 {
		self.github_issue_number
	}

	pub fn project_id(&self) -> u64 {
		self.project_id
	}

	pub fn gate(&self) -> u8 {
		self.gate
	}
}

#[derive(Debug, Serialize, Deserialize, JsonSchema, Clone)]
pub struct Contribution {
	pub id: String,
	pub title: String,
	pub description: String,
	pub github_link: String,
	pub status: String,
	pub gate: u8,
	pub metadata: Metadata,
	pub closed: bool,
	pub project_id: String,
}

#[derive(Debug, Serialize, Deserialize, JsonSchema, Clone)]
pub struct Metadata {
	pub assignee: Option<String>,
	pub github_username: Option<String>,
	pub difficulty: Option<String>,
	pub technology: Option<String>,
	pub duration: Option<String>,
	pub context: Option<String>,
	pub r#type: Option<String>,
}

impl From<ContributionProjection> for Contribution {
	fn from(contribution: ContributionProjection) -> Self {
		Contribution {
			id: contribution.id.to_string(),
			title: contribution.title.unwrap_or_default(),
			description: contribution.description.unwrap_or_default(),
			github_link: match contribution.external_link {
				Some(link) => link.to_string(),
				None => "".to_string(),
			},
			status: contribution.status.to_string(),
			gate: contribution.gate,
			metadata: Metadata {
				assignee: contribution.contributor_account_address.map(|id| id.to_string()),
				github_username: None,
				difficulty: contribution.metadata.difficulty,
				technology: contribution.metadata.technology,
				duration: contribution.metadata.duration,
				context: contribution.metadata.context,
				r#type: contribution.metadata.r#type,
			},
			closed: contribution.closed,
			project_id: contribution.project_id.to_string(),
		}
	}
}

pub fn build_contribution_dto(
	contribution: ContributionProjection,
	contributor_projection_repository: &Arc<dyn ContributorProjectionRepository>,
) -> Option<Contribution> {
	let contributor = contribution.contributor_account_address.clone().and_then(|id| {
		match contributor_projection_repository.find_by_account_address(&id) {
			Ok(c) => Some(c),
			Err(e) => {
				error!("Failed to find contributor with account address {id}: {e}");
				None
			},
		}
	});

	let mut contribution = Contribution::from(contribution);
	contribution.metadata.github_username = contributor.map(|c| c.github_username);
	Some(contribution)
}
