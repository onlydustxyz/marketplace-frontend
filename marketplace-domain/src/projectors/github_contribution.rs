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

pub struct GithubContributionProjector {
	contribution_projection_repository: Arc<dyn ContributionProjectionRepository>,
	github_client: Arc<dyn GithubClient>,
}

impl GithubContributionProjector {
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

		let contribution = GithubContribution {
			id: id.clone(),
			project_id,
			issue_number,
			contributor_account_address: None,
			status: ContributionStatus::Open,
			gate,
			title: issue.clone().map(|issue| issue.title),
			description: issue.clone().and_then(|issue| issue.description),
			external_link: issue.clone().map(|issue| issue.external_link),
			metadata: GithubContributionMetadata {
				difficulty: issue.clone().and_then(|issue| issue.difficulty),
				technology: issue.clone().and_then(|issue| issue.technology),
				duration: issue.clone().and_then(|issue| issue.duration),
				context: issue.clone().and_then(|issue| issue.context),
				r#type: issue.and_then(|issue| issue.r#type),
			},
			closed: false,
		};

		self.contribution_projection_repository.insert(contribution).map_err_into()
	}

	fn on_assign(
		&self,
		id: &ContributionId,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_contributor_and_status(
				id,
				Some(contributor_account_address),
				ContributionStatus::Assigned,
			)
			.map_err_into()
	}

	fn on_unassign(&self, id: &ContributionId) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_contributor_and_status(id, None, ContributionStatus::Open)
			.map_err_into()
	}

	fn on_validate(&self, id: &ContributionId) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_status(id, ContributionStatus::Completed)
			.map_err_into()
	}

	fn on_gate_changed(&self, id: &ContributionId, gate: u8) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_gate(id.clone(), gate)
			.map_err_into()
	}

	fn on_close(&self, id: &ContributionId) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_status(id, ContributionStatus::Abandoned)?;

		self.contribution_projection_repository.update_closed(id, true).map_err_into()
	}

	fn on_reopen(&self, id: &ContributionId) -> Result<(), Error> {
		self.contribution_projection_repository
			.update_status(id, ContributionStatus::Open)?;

		self.contribution_projection_repository.update_closed(id, false).map_err_into()
	}
}

#[async_trait]
impl EventListener for GithubContributionProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Contribution(contribution_event) => match contribution_event {
				ContributionEvent::Created {
					id,
					project_id,
					issue_number,
					gate,
				} => self.on_create(id, *project_id, *issue_number, *gate).await,
				ContributionEvent::Assigned {
					id,
					contributor_account_address,
				}
				| ContributionEvent::Claimed {
					id,
					contributor_account_address,
				} => self.on_assign(id, contributor_account_address),
				ContributionEvent::Unassigned { id } => self.on_unassign(id),
				ContributionEvent::Validated { id } => self.on_validate(id),
				ContributionEvent::GateChanged { id, gate } => self.on_gate_changed(id, *gate),
				ContributionEvent::Closed { id } => self.on_close(id),
				ContributionEvent::Reopened { id } => self.on_reopen(id),
				ContributionEvent::Deployed { .. }
				| ContributionEvent::Applied { .. }
				| ContributionEvent::ApplicationRefused { .. } => return,
			},
			_ => return,
		};

		if let Err(error) = result {
			error!("Failed to project event {event}: {}", error.to_string());
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;
	use std::sync::Arc;

	#[fixture]
	fn contribution_projection_repository() -> MockContributionProjectionRepository {
		MockContributionProjectionRepository::new()
	}

	#[fixture]
	fn github_client() -> MockGithubClient {
		MockGithubClient::new()
	}

	#[fixture]
	fn contribution_id() -> ContributionId {
		ContributionId::from(123)
	}

	#[fixture]
	fn contributor_account_address() -> ContributorAccountAddress {
		123.into()
	}

	#[fixture]
	fn project_id() -> GithubProjectId {
		123456
	}

	#[fixture]
	fn issue_number() -> GithubIssueNumber {
		654321
	}

	#[fixture]
	fn github_issue(project_id: GithubProjectId, issue_number: GithubIssueNumber) -> GithubIssue {
		GithubIssue {
			project_id,
			number: issue_number,
			..Default::default()
		}
	}

	#[fixture]
	fn gate() -> u8 {
		2
	}

	#[fixture]
	fn contribution(
		contribution_id: ContributionId,
		project_id: GithubProjectId,
		gate: u8,
		github_issue: GithubIssue,
		issue_number: GithubIssueNumber,
	) -> GithubContribution {
		GithubContribution {
			id: contribution_id,
			project_id,
			issue_number,
			gate,
			contributor_account_address: None,
			status: ContributionStatus::Open,
			title: Some(github_issue.title),
			description: github_issue.description,
			external_link: Some(github_issue.external_link),
			metadata: GithubContributionMetadata {
				difficulty: github_issue.difficulty,
				technology: github_issue.technology,
				duration: github_issue.duration,
				context: github_issue.context,
				r#type: github_issue.r#type,
			},
			closed: false,
		}
	}

	#[fixture]
	fn contribution_created_event(
		contribution_id: ContributionId,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		gate: u8,
	) -> ContributionEvent {
		ContributionEvent::Created {
			id: contribution_id,
			project_id,
			issue_number,
			gate,
		}
	}

	#[fixture]
	fn contribution_assigned_event(
		contribution_id: ContributionId,
		contributor_account_address: ContributorAccountAddress,
	) -> ContributionEvent {
		ContributionEvent::Assigned {
			id: contribution_id,
			contributor_account_address,
		}
	}

	#[fixture]
	fn contribution_unassigned_event(contribution_id: ContributionId) -> ContributionEvent {
		ContributionEvent::Unassigned {
			id: contribution_id,
		}
	}

	#[fixture]
	fn contribution_validated_event(contribution_id: ContributionId) -> ContributionEvent {
		ContributionEvent::Validated {
			id: contribution_id,
		}
	}

	#[fixture]
	fn new_gate() -> u8 {
		5
	}

	#[fixture]
	fn gate_changed_event(contribution_id: ContributionId, new_gate: u8) -> ContributionEvent {
		ContributionEvent::GateChanged {
			id: contribution_id,
			gate: new_gate,
		}
	}

	#[rstest]
	async fn on_contribution_created_event(
		mut contribution_projection_repository: MockContributionProjectionRepository,
		mut github_client: MockGithubClient,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		github_issue: GithubIssue,
		contribution: GithubContribution,
		contribution_created_event: ContributionEvent,
	) {
		github_client
			.expect_find_issue_by_id()
			.with(eq(project_id), eq(issue_number))
			.returning(move |_, _| Ok(github_issue.clone()));

		contribution_projection_repository
			.expect_insert()
			.with(eq(contribution))
			.returning(|_| Ok(()));

		let projector = GithubContributionProjector::new(
			Arc::new(contribution_projection_repository),
			Arc::new(github_client),
		);

		projector.on_event(&Event::Contribution(contribution_created_event)).await;
	}

	#[rstest]
	async fn on_contribution_assigned_event(
		mut contribution_projection_repository: MockContributionProjectionRepository,
		github_client: MockGithubClient,
		contributor_account_address: ContributorAccountAddress,
		contribution_id: ContributionId,
		contribution_assigned_event: ContributionEvent,
	) {
		contribution_projection_repository
			.expect_update_contributor_and_status()
			.withf(
				move |input_contribution_id, input_contributor_account_address, input_status| {
					input_contribution_id.eq(&contribution_id)
						&& input_contributor_account_address.eq(&Some(&contributor_account_address))
						&& input_status.eq(&ContributionStatus::Assigned)
				},
			)
			.returning(|_, _, _| Ok(()));

		let projector = GithubContributionProjector::new(
			Arc::new(contribution_projection_repository),
			Arc::new(github_client),
		);

		projector.on_event(&Event::Contribution(contribution_assigned_event)).await;
	}

	#[rstest]
	async fn on_contribution_unassigned_event(
		mut contribution_projection_repository: MockContributionProjectionRepository,
		github_client: MockGithubClient,
		contribution_id: ContributionId,
		contribution_unassigned_event: ContributionEvent,
	) {
		contribution_projection_repository
			.expect_update_contributor_and_status()
			.withf(
				move |input_contribution_id, input_contributor_account_address, input_status| {
					input_contribution_id.eq(&contribution_id)
						&& input_contributor_account_address.eq(&None)
						&& input_status.eq(&ContributionStatus::Open)
				},
			)
			.returning(|_, _, _| Ok(()));

		let projector = GithubContributionProjector::new(
			Arc::new(contribution_projection_repository),
			Arc::new(github_client),
		);

		projector.on_event(&Event::Contribution(contribution_unassigned_event)).await;
	}

	#[rstest]
	async fn on_contribution_validated_event(
		mut contribution_projection_repository: MockContributionProjectionRepository,
		github_client: MockGithubClient,
		contribution_id: ContributionId,
		contribution_validated_event: ContributionEvent,
	) {
		contribution_projection_repository
			.expect_update_status()
			.with(eq(contribution_id), eq(ContributionStatus::Completed))
			.returning(|_, _| Ok(()));

		let projector = GithubContributionProjector::new(
			Arc::new(contribution_projection_repository),
			Arc::new(github_client),
		);

		projector.on_event(&Event::Contribution(contribution_validated_event)).await;
	}

	#[rstest]
	async fn on_gate_changed_event(
		mut contribution_projection_repository: MockContributionProjectionRepository,
		github_client: MockGithubClient,
		contribution_id: ContributionId,
		new_gate: u8,
		gate_changed_event: ContributionEvent,
	) {
		contribution_projection_repository
			.expect_update_gate()
			.with(eq(contribution_id), eq(new_gate))
			.returning(|_, _| Ok(()));

		let projector = GithubContributionProjector::new(
			Arc::new(contribution_projection_repository),
			Arc::new(github_client),
		);

		projector.on_event(&Event::Contribution(gate_changed_event)).await;
	}
}
