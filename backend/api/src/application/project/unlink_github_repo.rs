use anyhow::Result;
use domain::{DomainError, GithubRepositoryId, ProjectId};
use tracing::instrument;

use crate::infrastructure::database::{GithubRepoRepository, ProjectGithubRepoRepository};

pub struct Usecase {
	github_repo_repository: GithubRepoRepository,
	project_github_repo_repository: ProjectGithubRepoRepository,
}

impl Usecase {
	pub fn new(
		github_repo_repository: GithubRepoRepository,
		project_github_repo_repository: ProjectGithubRepoRepository,
	) -> Self {
		Self {
			github_repo_repository,
			project_github_repo_repository,
		}
	}

	fn remove_orphan_github_repo_details(
		&self,
		github_repo_id: &GithubRepositoryId,
	) -> Result<(), DomainError> {
		let projects = self.project_github_repo_repository.find_all_projects_of(github_repo_id)?;
		if projects.is_empty() {
			self.github_repo_repository.delete(github_repo_id)?;
		}
		Ok(())
	}

	fn unlink_github_repo_to_project(
		&self,
		project_id: &ProjectId,
		github_repo_id: &GithubRepositoryId,
	) -> Result<(), DomainError> {
		self.project_github_repo_repository.delete(project_id, github_repo_id)?;
		Ok(())
	}

	#[instrument(skip(self))]
	pub async fn unlink_github_repo(
		&self,
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
	) -> Result<(), DomainError> {
		self.unlink_github_repo_to_project(&project_id, &github_repo_id)?;
		self.remove_orphan_github_repo_details(&github_repo_id)?;
		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use mockall::predicate::eq;
	use rstest::{fixture, rstest};
	use uuid::Uuid;

	use super::*;

	#[fixture]
	fn project_id() -> ProjectId {
		Uuid::from_str("9859fcd9-b357-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn other_project_id() -> ProjectId {
		Uuid::from_str("848bb228-ed70-46c0-8f07-e1402667a39e").unwrap().into()
	}

	#[fixture]
	fn github_repo_id() -> GithubRepositoryId {
		4324334i64.into()
	}

	#[rstest]
	async fn test_unlink_github_repo_and_delete_repo_details(
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
	) {
		let mut project_github_repo_repository = ProjectGithubRepoRepository::default();
		project_github_repo_repository
			.expect_delete()
			.once()
			.with(eq(project_id), eq(github_repo_id))
			.returning(|_, _| Ok(()));

		project_github_repo_repository
			.expect_find_all_projects_of()
			.once()
			.with(eq(github_repo_id))
			.returning(move |_| Ok(vec![]));

		let mut github_repo_repository = GithubRepoRepository::default();
		github_repo_repository
			.expect_delete()
			.once()
			.with(eq(github_repo_id))
			.returning(|_| Ok(()));

		let usecase = Usecase::new(github_repo_repository, project_github_repo_repository);

		usecase.unlink_github_repo(project_id, github_repo_id).await.unwrap();
	}

	#[rstest]
	async fn test_unlink_github_repo_but_do_not_delete_repo_details(
		project_id: ProjectId,
		github_repo_id: GithubRepositoryId,
		other_project_id: ProjectId,
	) {
		let mut project_github_repo_repository = ProjectGithubRepoRepository::default();
		project_github_repo_repository
			.expect_delete()
			.once()
			.with(eq(project_id), eq(github_repo_id))
			.returning(|_, _| Ok(()));

		project_github_repo_repository
			.expect_find_all_projects_of()
			.once()
			.with(eq(github_repo_id))
			.returning(move |_| Ok(vec![(other_project_id, github_repo_id)]));

		let mut github_repo_repository = GithubRepoRepository::default();
		github_repo_repository.expect_delete().never();

		let usecase = Usecase::new(github_repo_repository, project_github_repo_repository);

		usecase.unlink_github_repo(project_id, github_repo_id).await.unwrap();
	}
}
