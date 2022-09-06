use crate::*;
use async_trait::async_trait;
use log::error;
use std::sync::Arc;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	GithubRepo(#[from] GithubRepoRepositoryError),
	#[error(transparent)]
	ProjectProjectionRepository(#[from] ProjectProjectionRepositoryError),
}

pub struct ProjectProjector {
	github_repo_repository: Arc<dyn GithubRepoRepository>,
	project_projection_repository: Arc<dyn ProjectProjectionRepository>,
}

impl ProjectProjector {
	pub fn new(
		github_repo_repository: Arc<dyn GithubRepoRepository>,
		project_projection_repository: Arc<dyn ProjectProjectionRepository>,
	) -> Self {
		Self {
			github_repo_repository,
			project_projection_repository,
		}
	}

	async fn on_contribution_created(&self, project_id: &GithubProjectId) -> Result<(), Error> {
		let repo = self.github_repo_repository.find(project_id).await?;
		self.project_projection_repository.create(ProjectProjection::new(
			repo.project_id,
			repo.owner,
			repo.name,
		))?;
		Ok(())
	}
}

#[async_trait]
impl Projector<Contribution> for ProjectProjector {
	async fn project(&self, event: &<Contribution as Aggregate>::Event) {
		let result = match event {
			ContributionEvent::Created {
				id: _,
				project_id,
				issue_number: _,
				gate: _,
			} => self.on_contribution_created(project_id).await,
			_ => Ok(()),
		};

		if let Err(error) = result {
			error!("Unable to project event {event}: {}", error.to_string());
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use mockall::predicate::eq;
	use rstest::*;

	#[fixture]
	fn github_repo_repository() -> MockGithubRepoRepository {
		MockGithubRepoRepository::new()
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
		mut github_repo_repository: MockGithubRepoRepository,
		mut project_projection_repository: MockProjectProjectionRepository,
		project_id: GithubProjectId,
		contribution_created_event: ContributionEvent,
		repo: GithubRepo,
	) {
		let cloned_repo = repo.clone();
		github_repo_repository
			.expect_find()
			.with(eq(project_id))
			.times(1)
			.returning(move |_| Ok(cloned_repo.clone()));

		project_projection_repository
			.expect_create()
			.with(eq(ProjectProjection::new(
				repo.project_id,
				repo.owner,
				repo.name,
			)))
			.times(1)
			.returning(|_| Ok(()));

		let projector = ProjectProjector::new(
			Arc::new(github_repo_repository),
			Arc::new(project_projection_repository),
		);

		projector.project(&contribution_created_event).await;
	}
}
