use crate::*;
use futures::executor::block_on;
use log::error;
use mapinto::ResultMapErrInto;
use std::sync::Arc;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Contribution(#[from] ContributionRepositoryError),
	#[error(transparent)]
	GithubIssue(#[from] GithubIssueRepositoryError),
}

pub struct WithGithubDataProjection {
	contribution_repository: Arc<dyn ContributionRepository>,
	github_issue_repository: Arc<dyn GithubIssueRepository>,
}

impl WithGithubDataProjection {
	pub fn new(
		contribution_repository: Arc<dyn ContributionRepository>,
		github_issue_repository: Arc<dyn GithubIssueRepository>,
	) -> Self {
		Self {
			contribution_repository,
			github_issue_repository,
		}
	}

	async fn create(
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

		let contribution = Contribution {
			id: id.to_owned(),
			project_id: *project_id,
			issue_number: *issue_number,
			contributor_id: None,
			status: ContributionStatus::Open,
			gate,
			title: issue.clone().map(|issue| issue.title),
			description: issue.clone().and_then(|issue| issue.description),
			external_link: issue.clone().map(|issue| issue.external_link),
			metadata: ContributionMetadata {
				difficulty: issue.clone().and_then(|issue| issue.difficulty),
				technology: issue.clone().and_then(|issue| issue.technology),
				duration: issue.clone().and_then(|issue| issue.duration),
				context: issue.clone().and_then(|issue| issue.context),
				r#type: issue.and_then(|issue| issue.r#type),
			},
		};

		self.contribution_repository.create(contribution).map_err_into()
	}

	fn assign(&self, id: &ContributionId, contributor_id: &ContributorId) -> Result<(), Error> {
		self.contribution_repository
			.update_contributor_and_status(
				id.to_owned(),
				Some(contributor_id.to_owned()),
				ContributionStatus::Assigned,
			)
			.map_err_into()
	}

	fn unassign(&self, id: &ContributionId) -> Result<(), Error> {
		self.contribution_repository
			.update_status(id.to_owned(), ContributionStatus::Open)
			.map_err_into()
	}

	fn validate(&self, id: &ContributionId) -> Result<(), Error> {
		self.contribution_repository
			.update_status(id.to_owned(), ContributionStatus::Completed)
			.map_err_into()
	}
}

impl Projector<ContributionAggregate> for WithGithubDataProjection {
	fn project(&self, event: &ContributionEvent) {
		let result = match event {
			ContributionEvent::Created {
				id,
				project_id,
				issue_number,
				gate,
			} => block_on(self.create(id, project_id, issue_number, *gate)),
			ContributionEvent::Assigned { id, contributor_id } => self.assign(id, contributor_id),
			ContributionEvent::Unassigned { id } => self.unassign(id),
			ContributionEvent::Validated { id } => self.validate(id),
		};

		if let Err(error) = result {
			error!(
				"Unable to update WithGithubDataProjection with event {event}: {}",
				error.to_string()
			);
		}
	}
}
