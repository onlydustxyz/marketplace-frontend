use super::*;
use crate::*;
use anyhow::anyhow;
use mockall::predicate::eq;
use rstest::*;
use std::sync::Arc;

#[fixture]
fn github_client() -> MockGithubClient {
	MockGithubClient::new()
}

#[fixture]
fn project_projection_repository() -> MockProjectProjectionRepository {
	MockProjectProjectionRepository::new()
}

#[fixture]
fn project_id() -> GithubProjectId {
	1234
}

#[fixture]
fn contribution_created_event(project_id: GithubProjectId) -> ContributionEvent {
	ContributionEvent::Created {
		id: Default::default(),
		project_id,
		issue_number: Default::default(),
		gate: Default::default(),
	}
}

#[fixture]
fn repo(project_id: GithubProjectId) -> GithubRepo {
	GithubRepo {
		project_id,
		..Default::default()
	}
}

#[rstest]
async fn project_gets_created_with_contribution(
	mut github_client: MockGithubClient,
	mut project_projection_repository: MockProjectProjectionRepository,
	project_id: GithubProjectId,
	contribution_created_event: ContributionEvent,
	repo: GithubRepo,
) {
	project_projection_repository
		.expect_find_by_id()
		.with(eq(repo.project_id))
		.times(1)
		.returning(|_| Err(ProjectProjectionRepositoryError::NotFound(anyhow!("oops"))));

	let cloned_repo = repo.clone();
	github_client
		.expect_find_repository_by_id()
		.with(eq(project_id))
		.times(1)
		.returning(move |_| Ok(cloned_repo.clone()));

	project_projection_repository
		.expect_store()
		.with(eq(ProjectProjection::new(
			repo.project_id,
			repo.owner,
			repo.name,
		)))
		.times(1)
		.returning(|_| Ok(()));

	let projector = ProjectProjector::new(
		Arc::new(github_client),
		Arc::new(project_projection_repository),
	);

	projector.project(&contribution_created_event).await;
}

#[rstest]
async fn project_is_not_stored_if_already_present(
	mut github_client: MockGithubClient,
	mut project_projection_repository: MockProjectProjectionRepository,
	project_id: GithubProjectId,
	contribution_created_event: ContributionEvent,
	repo: GithubRepo,
) {
	project_projection_repository
		.expect_find_by_id()
		.with(eq(project_id))
		.times(1)
		.returning(move |_| {
			Ok(ProjectProjection::new(
				repo.project_id,
				repo.owner.clone(),
				repo.name.clone(),
			))
		});

	github_client.expect_find_repository_by_id().times(0);

	let projector = ProjectProjector::new(
		Arc::new(github_client),
		Arc::new(project_projection_repository),
	);

	projector.project(&contribution_created_event).await;
}
