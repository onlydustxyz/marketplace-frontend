use anyhow::Result;
use diesel::{query_dsl::RunQueryDsl, ExpressionMethods, QueryDsl};
use domain::{
	Destination, GithubCiChecks, GithubPullRequest, GithubPullRequestId, GithubPullRequestStatus,
	Publisher,
};
use event_listeners::{listeners::github::Event, models, GITHUB_EVENTS_EXCHANGE};
use fixtures::*;
use infrastructure::{
	amqp::UniqueMessage,
	database::{
		self,
		enums::ContributionType,
		schema::{
			contributions, github_pull_request_commits, github_pull_request_reviews,
			github_pull_requests,
		},
	},
};
use olog::info;
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::context::{docker, event_listeners::Context};

mod context;
mod fixtures;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn pull_request_projection_it(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_project_pull_request_events()
		.await
		.expect("should_project_pull_request_events");

	test.should_override_pull_request_commits()
		.await
		.expect("should_override_pull_request_commits");

	test.should_override_pull_request_reviews()
		.await
		.expect("should_override_pull_request_reviews");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_project_pull_request_events(&mut self) -> Result<()> {
		info!("should_project_pull_request_events");

		// When
		self.context
			.amqp
			.publisher
			.publish(
				Destination::exchange(GITHUB_EVENTS_EXCHANGE),
				&UniqueMessage::new(Event::PullRequest(GithubPullRequest {
					id: 1455874031u64.into(),
					repo_id: repos::marketplace().id,
					number: 1146u64.into(),
					title: String::from("Hide tooltips on mobile"),
					status: GithubPullRequestStatus::Merged,
					html_url: "https://github.com/onlydustxyz/marketplace/pull/1146"
						.parse()
						.unwrap(),
					created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
					updated_at: "2023-07-31T09:32:08Z".parse().unwrap(),
					closed_at: "2023-07-31T09:32:08Z".parse().ok(),
					author: users::alex(),
					merged_at: "2023-07-31T09:32:08Z".parse().ok(),
					draft: false,
					ci_checks: Some(GithubCiChecks::Passed),
					commits: vec![commits::a(), commits::b()],
					reviews: vec![reviews::approved()],
				})),
			)
			.await?;

		// Then
		let mut connection = self.context.database.client.connection()?;
		{
			let mut pull_requests: Vec<models::github_pull_requests::Inner> = retry(
				|| github_pull_requests::table.load(&mut *connection),
				|res| !res.is_empty(),
			)
			.await?;
			assert_eq!(pull_requests.len(), 1, "Invalid pull requests count");

			let pull_request = pull_requests.pop().unwrap();
			assert_eq!(pull_request.id, 1455874031u64.into());
			assert_eq!(pull_request.repo_id, repos::marketplace().id);
			assert_eq!(pull_request.number, 1146u64.into());
			assert_eq!(
				pull_request.created_at,
				"2023-07-31T09:23:37".parse().unwrap()
			);
			assert_eq!(pull_request.author_id, users::alex().id);
			assert_eq!(pull_request.merged_at, "2023-07-31T09:32:08".parse().ok());
			assert_eq!(
				pull_request.status,
				infrastructure::database::enums::GithubPullRequestStatus::Merged
			);
			assert_eq!(pull_request.title, "Hide tooltips on mobile");
			assert_eq!(
				pull_request.html_url,
				"https://github.com/onlydustxyz/marketplace/pull/1146"
			);
			assert_eq!(pull_request.closed_at, "2023-07-31T09:32:08".parse().ok());
			assert!(!pull_request.draft);
			assert_eq!(
				pull_request.ci_checks,
				Some(infrastructure::database::enums::GithubCiChecks::Passed)
			);
		}

		{
			let mut commits: Vec<models::github_pull_requests::Commit> =
				github_pull_request_commits::table.load(&mut *connection)?;
			assert_eq!(commits.len(), 2, "Invalid commits count");

			{
				let commit = commits.pop().unwrap();
				assert_eq!(commit.pull_request_id, 1455874031u64.into());
				assert_eq!(commit.sha, commits::b().sha);
				assert_eq!(commit.author_id, commits::b().author.id);
				assert_eq!(commit.html_url, commits::b().html_url.to_string());
			}

			{
				let commit = commits.pop().unwrap();
				assert_eq!(commit.pull_request_id, 1455874031u64.into());
				assert_eq!(commit.sha, commits::a().sha);
				assert_eq!(commit.author_id, commits::a().author.id);
				assert_eq!(commit.html_url, commits::a().html_url.to_string());
			}
		}

		{
			let mut reviews: Vec<models::github_pull_requests::Review> =
				github_pull_request_reviews::table.load(&mut *connection)?;
			assert_eq!(reviews.len(), 1, "Invalid reviews count");

			let review = reviews.pop().unwrap();
			assert_eq!(review.pull_request_id, 1455874031u64.into());
			assert_eq!(review.reviewer_id, reviews::approved().reviewer.id);
			assert_eq!(
				review.status,
				database::enums::GithubCodeReviewStatus::Completed
			);
			assert_eq!(
				review.outcome,
				Some(database::enums::GithubCodeReviewOutcome::Approved)
			);
			assert_eq!(review.submitted_at, "2023-07-31T09:32:08".parse().ok());
		}

		{
			let mut contributions: Vec<models::Contribution> =
				contributions::table.load(&mut *connection)?;
			assert_eq!(contributions.len(), 2, "Invalid contributions count");

			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::CodeReview);
				assert_eq!(contribution.user_id, users::anthony().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1455874031u64).into()
				);
			}

			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::PullRequest);
				assert_eq!(contribution.user_id, users::anthony().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1455874031u64).into()
				);
			}
		}

		Ok(())
	}

	async fn should_override_pull_request_commits(&mut self) -> Result<()> {
		info!("should_override_pull_request_commits");

		// When
		self.context
			.amqp
			.publisher
			.publish(
				Destination::exchange(GITHUB_EVENTS_EXCHANGE),
				&UniqueMessage::new(Event::PullRequest(GithubPullRequest {
					id: 1455874031u64.into(),
					repo_id: repos::marketplace().id,
					number: 1146u64.into(),
					title: String::from("updated"),
					status: GithubPullRequestStatus::Merged,
					html_url: "https://github.com/onlydustxyz/marketplace/pull/1146"
						.parse()
						.unwrap(),
					created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
					updated_at: "2023-07-31T09:32:08Z".parse().unwrap(),
					closed_at: "2023-07-31T09:32:08Z".parse().ok(),
					author: users::alex(),
					merged_at: "2023-07-31T09:32:08Z".parse().ok(),
					draft: false,
					ci_checks: Some(GithubCiChecks::Passed),
					commits: vec![commits::c()],
					reviews: vec![],
				})),
			)
			.await?;

		// Then
		let mut connection = self.context.database.client.connection()?;
		retry(
			|| github_pull_requests::table.load(&mut *connection),
			|res: &[models::github_pull_requests::Inner]| {
				!res.is_empty() && res[0].title == "updated"
			},
		)
		.await?;

		{
			let mut commits: Vec<models::github_pull_requests::Commit> =
				github_pull_request_commits::table.load(&mut *connection)?;
			assert_eq!(commits.len(), 1, "Invalid commits count");

			let commit = commits.pop().unwrap();
			assert_eq!(commit.pull_request_id, 1455874031u64.into());
			assert_eq!(commit.sha, commits::c().sha);
			assert_eq!(commit.author_id, commits::c().author.id);
			assert_eq!(commit.html_url, commits::c().html_url.to_string());
		}

		{
			let mut contributions: Vec<models::Contribution> =
				contributions::table.load(&mut *connection)?;
			assert_eq!(contributions.len(), 1, "Invalid contributions count");

			let contribution = contributions.pop().unwrap();
			assert_eq!(contribution.repo_id, repos::marketplace().id);
			assert_eq!(contribution.type_, ContributionType::PullRequest);
			assert_eq!(contribution.user_id, users::alex().id);
			assert_eq!(
				contribution.details_id,
				GithubPullRequestId::from(1455874031u64).into()
			);
		}

		Ok(())
	}

	async fn should_override_pull_request_reviews(&mut self) -> Result<()> {
		info!("should_override_pull_request_reviews");

		// When
		self.context
			.amqp
			.publisher
			.publish(
				Destination::exchange(GITHUB_EVENTS_EXCHANGE),
				&UniqueMessage::new(Event::PullRequest(GithubPullRequest {
					id: 1455874031u64.into(),
					repo_id: repos::marketplace().id,
					number: 1146u64.into(),
					title: String::from("updated_again"),
					status: GithubPullRequestStatus::Merged,
					html_url: "https://github.com/onlydustxyz/marketplace/pull/1146"
						.parse()
						.unwrap(),
					created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
					updated_at: "2023-07-31T09:32:08Z".parse().unwrap(),
					closed_at: "2023-07-31T09:32:08Z".parse().ok(),
					author: users::alex(),
					merged_at: "2023-07-31T09:32:08Z".parse().ok(),
					draft: false,
					ci_checks: Some(GithubCiChecks::Passed),
					commits: vec![],
					reviews: vec![reviews::change_requested(), reviews::pending()],
				})),
			)
			.await?;

		// Then
		let mut connection = self.context.database.client.connection()?;
		retry(
			|| github_pull_requests::table.load(&mut *connection),
			|res: &[models::github_pull_requests::Inner]| {
				!res.is_empty() && res[0].title == "updated_again"
			},
		)
		.await?;

		{
			let mut reviews: Vec<models::github_pull_requests::Review> =
				github_pull_request_reviews::table.load(&mut *connection)?;
			assert_eq!(reviews.len(), 2, "Invalid reviews count");

			{
				let review = reviews.pop().unwrap();
				assert_eq!(review.pull_request_id, 1455874031u64.into());
				assert_eq!(review.reviewer_id, reviews::pending().reviewer.id);
				assert_eq!(
					review.status,
					database::enums::GithubCodeReviewStatus::Pending
				);
				assert_eq!(review.outcome, None);
				assert_eq!(review.submitted_at, None);
			}

			{
				let review = reviews.pop().unwrap();
				assert_eq!(review.pull_request_id, 1455874031u64.into());
				assert_eq!(review.reviewer_id, reviews::change_requested().reviewer.id);
				assert_eq!(
					review.status,
					database::enums::GithubCodeReviewStatus::Pending
				);
				assert_eq!(
					review.outcome,
					Some(database::enums::GithubCodeReviewOutcome::ChangeRequested)
				);
				assert_eq!(review.submitted_at, "2023-07-31T09:32:08".parse().ok());
			}
		}

		{
			let mut contributions: Vec<models::Contribution> = contributions::table
				.order(contributions::user_id.desc())
				.load(&mut *connection)?;
			assert_eq!(contributions.len(), 2, "Invalid contributions count");

			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::CodeReview);
				assert_eq!(contribution.user_id, users::alex().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1455874031u64).into()
				);
			}

			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::CodeReview);
				assert_eq!(contribution.user_id, users::anthony().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1455874031u64).into()
				);
			}
		}

		Ok(())
	}
}
