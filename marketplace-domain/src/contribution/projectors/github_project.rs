use crate::*;
use async_trait::async_trait;
use log::error;
use std::sync::Arc;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	GithubRepo(#[from] GithubClientError),
	#[error(transparent)]
	ProjectProjectionRepository(#[from] ProjectProjectionRepositoryError),
}

pub struct GithubProjectProjector {
	github_client: Arc<dyn GithubClient>,
	project_projection_repository: Arc<dyn ProjectProjectionRepository>,
}

impl GithubProjectProjector {
	pub fn new(
		github_client: Arc<dyn GithubClient>,
		project_projection_repository: Arc<dyn ProjectProjectionRepository>,
	) -> Self {
		Self {
			github_client,
			project_projection_repository,
		}
	}

	async fn on_contribution_created(&self, project_id: GithubProjectId) -> Result<(), Error> {
		if self.project_projection_repository.find_by_id(project_id).is_err() {
			let repo = self.github_client.find_repository_by_id(project_id).await?;
			self.project_projection_repository.insert(ProjectProjection {
				id: repo.project_id,
				owner: repo.owner,
				name: repo.name,
				description: repo.description,
				url: repo.url,
				logo_url: repo.logo_url,
			})?;
		}
		Ok(())
	}
}

#[async_trait]
impl EventListener for GithubProjectProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Contribution(contribution_event) => match contribution_event {
				ContributionEvent::Created {
					id: _,
					project_id,
					issue_number: _,
					gate: _,
				} => self.on_contribution_created(*project_id).await,
				_ => return,
			},
			Event::Project(_) | Event::Contributor(_) => return,
		};

		if let Err(error) = result {
			error!("Unable to project event {event}: {}", error.to_string());
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;
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
	fn contribution_created_event(project_id: GithubProjectId) -> Event {
		Event::Contribution(ContributionEvent::Created {
			id: Default::default(),
			project_id,
			issue_number: Default::default(),
			gate: Default::default(),
		})
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
		contribution_created_event: Event,
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
			.expect_insert()
			.with(eq(ProjectProjection {
				id: repo.project_id,
				owner: repo.owner,
				name: repo.name,
				description: repo.description,
				url: repo.url,
				logo_url: repo.logo_url,
			}))
			.times(1)
			.returning(|_| Ok(()));

		let projector = GithubProjectProjector::new(
			Arc::new(github_client),
			Arc::new(project_projection_repository),
		);

		projector.on_event(&contribution_created_event).await;
	}

	#[rstest]
	async fn project_is_not_stored_if_already_present(
		mut github_client: MockGithubClient,
		mut project_projection_repository: MockProjectProjectionRepository,
		project_id: GithubProjectId,
		contribution_created_event: Event,
		repo: GithubRepo,
	) {
		project_projection_repository
			.expect_find_by_id()
			.with(eq(project_id))
			.times(1)
			.returning(move |_| {
				Ok(ProjectProjection {
					id: repo.project_id,
					owner: repo.owner.clone(),
					name: repo.name.clone(),
					description: repo.description.clone(),
					url: repo.url.clone(),
					logo_url: repo.logo_url.clone(),
				})
			});

		github_client.expect_find_repository_by_id().times(0);

		let projector = GithubProjectProjector::new(
			Arc::new(github_client),
			Arc::new(project_projection_repository),
		);

		projector.on_event(&contribution_created_event).await;
	}
}
