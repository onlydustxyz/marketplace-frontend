use crate::*;
use async_trait::async_trait;
use log::error;
use mapinto::ResultMapErrInto;
use std::sync::Arc;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Contribution(#[from] ContributionProjectionRepositoryError),
	#[error(transparent)]
	GithubIssue(#[from] GithubClientError),
}

pub struct WithGithubDataProjector {
	contribution_projection_repository: Arc<dyn ContributionProjectionRepository>,
	github_client: Arc<dyn GithubClient>,
}

impl WithGithubDataProjector {
	pub fn new(
		contribution_projection_repository: Arc<dyn ContributionProjectionRepository>,
		github_client: Arc<dyn GithubClient>,
	) -> Self {
		Self {
			contribution_projection_repository,
			github_client,
		}
	}

	async fn on_create(
		&self,
		id: &ContributionId,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		gate: u8,
	) -> Result<(), Error> {
		let issue = match self.github_client.find_issue_by_id(project_id, issue_number).await {
			Ok(issue) => Some(issue),
			Err(e) => {
				error!(
					"Failed to create contribution: error while fetching GitHub issue {issue_number} of project {project_id}: {e}",
				);
				None
			},
		};

		let contribution = ContributionProjection {
			id: id.clone(),
			project_id,
			issue_number,
			contributor_id: None,
			status: ContributionStatus::Open,
			gate,
			title: issue.clone().map(|issue| issue.title),
			description: issue.clone().and_then(|issue| issue.description),
			external_link: issue.clone().map(|issue| issue.external_link),
			metadata: ContributionProjectionMetadata {
				difficulty: issue.clone().and_then(|issue| issue.difficulty),
				technology: issue.clone().and_then(|issue| issue.technology),
				duration: issue.clone().and_then(|issue| issue.duration),
				context: issue.clone().and_then(|issue| issue.context),
				r#type: issue.and_then(|issue| issue.r#type),
			},
		};

		self.contribution_projection_repository.insert(contribution).map_err_into()
	}

	fn on_assign(&self, id: &ContributionId, contributor_id: &ContributorId) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_contributor_and_status(
				id.clone(),
				Some(contributor_id.clone()),
				ContributionStatus::Assigned,
			)
			.map_err_into()
	}

	fn on_unassign(&self, id: &ContributionId) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_status(id.clone(), ContributionStatus::Open)
			.map_err_into()
	}

	fn on_validate(&self, id: &ContributionId) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_status(id.clone(), ContributionStatus::Completed)
			.map_err_into()
	}

	fn on_gate_changed(&self, id: &ContributionId, gate: u8) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_gate(id.clone(), gate)
			.map_err_into()
	}
}

#[async_trait]
impl EventListener for WithGithubDataProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Contribution(contribution_event) => match contribution_event {
				ContributionEvent::Created {
					id,
					project_id,
					issue_number,
					gate,
				} => self.on_create(id, *project_id, *issue_number, *gate).await,
				ContributionEvent::Assigned { id, contributor_id } =>
					self.on_assign(id, contributor_id),
				ContributionEvent::Claimed { id, contributor_id } =>
					self.on_assign(id, contributor_id),
				ContributionEvent::Unassigned { id } => self.on_unassign(id),
				ContributionEvent::Validated { id } => self.on_validate(id),
				ContributionEvent::GateChanged { id, gate } => self.on_gate_changed(id, *gate),
				ContributionEvent::Deployed { .. }
				| ContributionEvent::Applied { .. }
				| ContributionEvent::ApplicationRefused { .. } => return,
			},
			Event::Project(_) | Event::Contributor(_) => return,
		};

		if let Err(error) = result {
			error!("Failed to project event {event}: {}", error.to_string());
		}
	}
}
