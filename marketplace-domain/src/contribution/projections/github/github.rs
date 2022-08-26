use super::super::*;
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
	uuid_generator: Arc<dyn UuidGenerator>,
	github_issue_repository: Arc<dyn GithubIssueRepository>,
}

impl WithGithubDataProjection {
	pub fn new(
		contribution_repository: Arc<dyn ContributionRepository>,
		uuid_generator: Arc<dyn UuidGenerator>,
		github_issue_repository: Arc<dyn GithubIssueRepository>,
	) -> Self {
		Self {
			contribution_repository,
			uuid_generator,
			github_issue_repository,
		}
	}

	async fn create(
		&self,
		id: &ContributionAggregateId,
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

		let uuid = self.uuid_generator.new_uuid();

		let contribution = Contribution {
			id: uuid.into(),
			onchain_id: id.to_string(),
			project_id: project_id.to_string(),
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
			..Default::default()
		};

		self.contribution_repository
			.create(contribution, Default::default())
			.map_err_into()
	}

	fn assign(
		&self,
		id: &ContributionAggregateId,
		contributor_id: &ContributorId,
	) -> Result<(), Error> {
		self.contribution_repository
			.update_contributor_and_status(
				id.to_string(),
				Some(contributor_id.to_owned()),
				ContributionStatus::Assigned,
				Default::default(),
			)
			.map_err_into()
	}

	fn unassign(&self, id: &ContributionAggregateId) -> Result<(), Error> {
		self.contribution_repository
			.update_status(id.to_string(), ContributionStatus::Open, Default::default())
			.map_err_into()
	}

	fn validate(&self, id: &ContributionAggregateId) -> Result<(), Error> {
		self.contribution_repository
			.update_status(
				id.to_string(),
				ContributionStatus::Completed,
				Default::default(),
			)
			.map_err_into()
	}
}

impl Projection<ContributionAggregate> for WithGithubDataProjection {
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
