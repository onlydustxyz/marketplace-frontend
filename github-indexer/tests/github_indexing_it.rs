use anyhow::Result;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::{GithubCodeReviewStatus, GithubIssueId, GithubPullRequestId};
use fixtures::*;
use github_indexer::models::{
	self, github_pull_requests::ClosingIssue, GithubRepoIndex, ProjectGithubRepo,
};
use infrastructure::{
	database::{
		enums::{ContributionStatus, ContributionType},
		schema::{contributions, projects_contributors, projects_pending_contributors},
	},
	dbclient::ImmutableRepository,
};
use olog::info;
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::context::{docker, Context};

mod context;
mod fixtures;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn new_github_repository_added(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_index_repo().await.expect("should_index_repo");
	test.should_update_index_repo().await.expect("should_update_index_repo");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_index_repo(&mut self) -> Result<()> {
		info!("should_index_repo");

		self.context.database.client.insert(ProjectGithubRepo {
			project_id: projects::project_id(),
			github_repo_id: repos::marketplace().id,
		})?;

		// When
		self.context
			.database
			.client
			.insert(GithubRepoIndex::new(repos::marketplace().id))?;

		self.context.indexing_scheduler.run_once().await?;

		// Then
		repos::assert_indexed(&mut self.context, vec![repos::marketplace()])?;
		issues::assert_indexed(
			&mut self.context,
			vec![issues::x1061(), issues::x1141(), issues::x1145()],
		)?;
		self.assert_marketplace_pulls_are_indexed_cycle_1()?;
		self.assert_marketplace_contributions_are_up_to_date(1)?;
		self.assert_marketplace_contributors_are_up_to_date_and_indexed(1)?;

		Ok(())
	}

	async fn should_update_index_repo(&mut self) -> Result<()> {
		info!("should_update_index_repo");

		// When
		self.context.indexing_scheduler.run_once().await?;

		// Then
		repos::assert_indexed(&mut self.context, vec![repos::marketplace()])?;
		issues::assert_indexed(
			&mut self.context,
			vec![issues::x1061(), issues::x1141(), issues::x1145()],
		)?;
		self.assert_marketplace_pulls_are_indexed_cycle_2()?;
		self.assert_marketplace_contributions_are_up_to_date(2)?;
		self.assert_marketplace_contributors_are_up_to_date_and_indexed(2)?;

		Ok(())
	}

	fn assert_marketplace_pulls_are_indexed_cycle_1(&mut self) -> Result<()> {
		pull_requests::assert_indexed(
			&mut self.context,
			vec![
				pull_requests::x1144(),
				pull_requests::x1146(),
				pull_requests::x1152(),
			],
		)?;

		commits::assert_indexed(
			&mut self.context,
			vec![
				(commits::f(), pull_requests::x1144().id),
				(commits::g(), pull_requests::x1144().id),
				(commits::c(), pull_requests::x1146().id),
				(commits::d(), pull_requests::x1146().id),
				(commits::e(), pull_requests::x1146().id),
				(commits::b(), pull_requests::x1152().id),
				(commits::a(), pull_requests::x1152().id),
			],
		)?;

		reviews::assert_indexed(
			&mut self.context,
			vec![
				// Reviews requested
				reviews::requested(pull_requests::x1144().id, GithubCodeReviewStatus::Pending),
				reviews::requested(pull_requests::x1146().id, GithubCodeReviewStatus::Pending),
				// Actual reviews
				reviews::change_requested(
					pull_requests::x1152().id,
					GithubCodeReviewStatus::Completed,
				),
				reviews::commented(pull_requests::x1152().id, GithubCodeReviewStatus::Pending),
				reviews::approved(pull_requests::x1152().id, GithubCodeReviewStatus::Completed),
			],
		)?;

		Ok(())
	}

	fn assert_marketplace_pulls_are_indexed_cycle_2(&mut self) -> Result<()> {
		pull_requests::assert_indexed(
			&mut self.context,
			vec![
				pull_requests::x1144(),
				pull_requests::x1146(),
				pull_requests::x1152_updated(),
			],
		)?;

		commits::assert_indexed(
			&mut self.context,
			vec![
				(commits::f(), pull_requests::x1144().id),
				(commits::g(), pull_requests::x1144().id),
				(commits::c(), pull_requests::x1146().id),
				(commits::d(), pull_requests::x1146().id),
				(commits::e(), pull_requests::x1146().id),
				(commits::h(), pull_requests::x1152().id),
				(commits::b(), pull_requests::x1152().id),
				(commits::a(), pull_requests::x1152().id),
			],
		)?;

		reviews::assert_indexed(
			&mut self.context,
			vec![
				// Reviews requested
				reviews::requested(pull_requests::x1144().id, GithubCodeReviewStatus::Pending),
				reviews::requested(pull_requests::x1146().id, GithubCodeReviewStatus::Pending),
				// Actual reviews
				reviews::change_requested(
					pull_requests::x1152().id,
					GithubCodeReviewStatus::Completed,
				),
				reviews::commented(pull_requests::x1152().id, GithubCodeReviewStatus::Pending),
				reviews::approved(pull_requests::x1152().id, GithubCodeReviewStatus::Completed),
			],
		)?;

		closing_issues::assert_indexed(
			&mut self.context,
			vec![ClosingIssue {
				github_pull_request_id: pull_requests::x1152().id,
				github_issue_id: issues::x1145().id,
			}],
		)?;

		Ok(())
	}

	fn assert_marketplace_contributions_are_up_to_date(&mut self, cycle: i32) -> Result<()> {
		let mut connection = self.context.database.client.connection()?;
		{
			let mut contributions: Vec<models::Contribution> = contributions::table
				.order((
					contributions::dsl::type_.desc(),
					contributions::dsl::details_id.desc(),
					contributions::dsl::user_id.desc(),
					contributions::dsl::created_at.asc(),
				))
				.load(&mut *connection)?;
			assert_eq!(
				contributions.len(),
				if cycle == 1 { 11 } else { 12 },
				"Invalid contribution count"
			);

			// Issue assigned to ofux
			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::Issue);
				assert_eq!(contribution.user_id, users::ofux().id);
				assert_eq!(
					contribution.details_id,
					GithubIssueId::from(1763108414u64).into()
				);
				assert_eq!(contribution.status, ContributionStatus::Complete);
			}

			// PR 1144
			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::PullRequest);
				assert_eq!(contribution.user_id, users::ofux().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1452363285u64).into()
				);
				assert_eq!(contribution.status, ContributionStatus::Canceled);
			}
			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::PullRequest);
				assert_eq!(contribution.user_id, users::anthony().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1452363285u64).into()
				);
				assert_eq!(contribution.status, ContributionStatus::Canceled);
			}

			// PR 1146
			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::PullRequest);
				assert_eq!(contribution.user_id, users::ofux().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1455874031u64).into()
				);
				assert_eq!(contribution.status, ContributionStatus::Complete);
			}

			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::PullRequest);
				assert_eq!(contribution.user_id, users::alex().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1455874031u64).into()
				);
				assert_eq!(contribution.status, ContributionStatus::Complete);
			}

			// PR 1152
			if cycle == 2 {
				{
					let contribution = contributions.pop().unwrap();
					assert_eq!(contribution.repo_id, repos::marketplace().id);
					assert_eq!(contribution.type_, ContributionType::PullRequest);
					assert_eq!(contribution.user_id, users::stan().id);
					assert_eq!(
						contribution.details_id,
						GithubPullRequestId::from(1458220740u64).into()
					);
					assert_eq!(contribution.status, ContributionStatus::InProgress);
				}
			}

			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::PullRequest);
				assert_eq!(contribution.user_id, users::anthony().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1458220740u64).into()
				);
				assert_eq!(contribution.status, ContributionStatus::InProgress);
			}

			// Code review by ofux (not approved)
			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::CodeReview);
				assert_eq!(contribution.user_id, users::ofux().id);
				assert_eq!(contribution.status, ContributionStatus::Complete);
			}

			// Code review by anthony (not approved)
			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::CodeReview);
				assert_eq!(contribution.user_id, users::anthony().id);
				assert_eq!(contribution.status, ContributionStatus::InProgress);
			}

			// Code review by alex (not approved)
			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::CodeReview);
				assert_eq!(contribution.user_id, users::alex().id);
				assert_eq!(contribution.status, ContributionStatus::InProgress);
			}

			// Code review by anthony (approved)
			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::CodeReview);
				assert_eq!(contribution.user_id, users::anthony().id);
				assert_eq!(contribution.status, ContributionStatus::Complete);
			}

			// Code review by anthony (not approved)
			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::CodeReview);
				assert_eq!(contribution.user_id, users::anthony().id);
				assert_eq!(contribution.status, ContributionStatus::InProgress);
			}
		}
		Ok(())
	}

	fn assert_marketplace_contributors_are_up_to_date_and_indexed(
		&mut self,
		cycle: i32,
	) -> Result<()> {
		let mut connection = self.context.database.client.connection()?;

		{
			let mut pending_contributors: Vec<models::ProjectsPendingContributor> =
				projects_pending_contributors::table.load(&mut *connection)?;
			assert_eq!(
				pending_contributors.len(),
				if cycle == 1 { 3 } else { 4 },
				"Invalid pending contributors count"
			);

			{
				let pending_contributor = pending_contributors.pop().unwrap();
				assert_eq!(pending_contributor.project_id, projects::project_id());
				assert_eq!(pending_contributor.github_user_id, users::anthony().id);
			}

			{
				let pending_contributor = pending_contributors.pop().unwrap();
				assert_eq!(pending_contributor.project_id, projects::project_id());
				assert_eq!(pending_contributor.github_user_id, users::alex().id);
			}

			if cycle == 2 {
				let pending_contributor = pending_contributors.pop().unwrap();
				assert_eq!(pending_contributor.project_id, projects::project_id());
				assert_eq!(pending_contributor.github_user_id, users::stan().id);
			}

			{
				let pending_contributor = pending_contributors.pop().unwrap();
				assert_eq!(pending_contributor.project_id, projects::project_id());
				assert_eq!(pending_contributor.github_user_id, users::ofux().id);
			}
		}

		{
			let mut contributors: Vec<models::ProjectsContributor> =
				projects_contributors::table.load(&mut *connection)?;
			assert_eq!(contributors.len(), 3, "Invalid contributors count");

			{
				let contributor = contributors.pop().unwrap();
				assert_eq!(contributor.project_id, projects::project_id());
				assert_eq!(contributor.github_user_id, users::anthony().id);
			}

			{
				let contributor = contributors.pop().unwrap();
				assert_eq!(contributor.project_id, projects::project_id());
				assert_eq!(contributor.github_user_id, users::alex().id);
			}

			{
				let contributor = contributors.pop().unwrap();
				assert_eq!(contributor.project_id, projects::project_id());
				assert_eq!(contributor.github_user_id, users::ofux().id);
			}
		}
		Ok(())
	}
}

#[test]
fn test() {
	println!("{}", -3197958591667974301_i128 as u64)
}
