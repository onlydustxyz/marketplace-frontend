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
	GithubIssue(#[from] GithubIssueRepositoryError),
}

pub struct WithGithubDataProjector {
	contribution_projection_repository: Arc<dyn ContributionProjectionRepository>,
	github_issue_repository: Arc<dyn GithubIssueRepository>,
}

impl WithGithubDataProjector {
	pub fn new(
		contribution_projection_repository: Arc<dyn ContributionProjectionRepository>,
		github_issue_repository: Arc<dyn GithubIssueRepository>,
	) -> Self {
		Self {
			contribution_projection_repository,
			github_issue_repository,
		}
	}

	async fn on_create(
		&self,
		id: &ContributionId,
		project_id: &GithubProjectId,
		issue_number: &GithubIssueNumber,
		gate: u8,
	) -> Result<(), Error> {
		let issue = match self.github_issue_repository.find(project_id, issue_number).await {
			Ok(Some(issue)) => Some(issue),

			Ok(None) => {
				error!("GitHub issue not found: {project_id}/{issue_number}");
				None
			},

			Err(e) => {
				error!(
					"Error while fetching GitHub issue {project_id}/{issue_number}: {}",
					e.to_string()
				);
				None
			},
		};

		let contribution = ContributionProjection {
			id: id.to_owned(),
			project_id: *project_id,
			issue_number: *issue_number,
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

		self.contribution_projection_repository.create(contribution).map_err_into()
	}

	fn on_assign(&self, id: &ContributionId, contributor_id: &ContributorId) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_contributor_and_status(
				id.to_owned(),
				Some(contributor_id.to_owned()),
				ContributionStatus::Assigned,
			)
			.map_err_into()
	}

	fn on_unassign(&self, id: &ContributionId) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_status(id.to_owned(), ContributionStatus::Open)
			.map_err_into()
	}

	fn on_validate(&self, id: &ContributionId) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_status(id.to_owned(), ContributionStatus::Completed)
			.map_err_into()
	}
}

#[async_trait]
impl Projector<Contribution> for WithGithubDataProjector {
	async fn project(&self, event: &ContributionEvent) {
		let result = match event {
			ContributionEvent::Created {
				id,
				project_id,
				issue_number,
				gate,
			} => self.on_create(id, project_id, issue_number, *gate).await,
			ContributionEvent::Assigned { id, contributor_id } =>
				self.on_assign(id, contributor_id),
			ContributionEvent::Unassigned { id } => self.on_unassign(id),
			ContributionEvent::Validated { id } => self.on_validate(id),
			ContributionEvent::Applied { .. } => Ok(()),
		};

		if let Err(error) = result {
			error!("Unable to project event {event}: {}", error.to_string());
		}
	}
}
