use anyhow::Result;
use diesel::{query_dsl::RunQueryDsl, ExpressionMethods, QueryDsl};
use domain::{
	Destination, GithubCiChecks, GithubFullPullRequest, GithubIssueNumber, GithubPullRequest,
	GithubPullRequestId, GithubPullRequestStatus, Publisher,
};
use event_listeners::{
	listeners::github::Event,
	models::{self, ProjectGithubRepo},
	GITHUB_EVENTS_EXCHANGE,
};
use fixtures::*;
use infrastructure::{
	amqp::UniqueMessage,
	database::{
		self,
		enums::{ContributionStatus, ContributionType},
		schema::{
			contributions, github_pull_request_commits, github_pull_request_reviews,
			github_pull_requests, project_github_repos, projects_contributors,
			projects_pending_contributors,
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

	let mut connection =
		test.context.database.client.connection().expect("Unable to connect to DB");
	diesel::insert_into(project_github_repos::table)
		.values(ProjectGithubRepo {
			project_id: projects::project_id(),
			github_repo_id: repos::marketplace().id,
		})
		.execute(&mut connection)
		.expect("link project with repo");

	test.should_project_merged_pull_request_events()
		.await
		.expect("should_project_merged_pull_request_events");

	test.should_project_unmerged_pull_request_events()
		.await
		.expect("should_project_unmerged_pull_request_events");

	test.should_project_full_pull_request_events()
		.await
		.expect("should_project_full_pull_request_events");

	test.should_update_full_pull_request_status()
		.await
		.expect("should_update_full_pull_request_status");

	test.should_override_pull_request_commits()
		.await
		.expect("should_override_pull_request_commits");

	test.should_override_pull_request_reviews()
		.await
		.expect("should_override_pull_request_reviews");

	test.should_not_override_pull_request_when_none()
		.await
		.expect("should_not_override_pull_request_when_none");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_project_merged_pull_request_events(&mut self) -> Result<()> {
		info!("should_project_pull_request_events");

		// When
		self.context
			.amqp
			.publisher
			.publish(
				Destination::exchange(GITHUB_EVENTS_EXCHANGE),
				&UniqueMessage::new(Event::PullRequest(GithubPullRequest {
					id: 5555874031u64.into(),
					repo_id: repos::marketplace().id,
					number: 5546u64.into(),
					title: String::from("Some merged PR"),
					status: GithubPullRequestStatus::Merged,
					html_url: "https://github.com/onlydustxyz/marketplace/pull/5546"
						.parse()
						.unwrap(),
					created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
					updated_at: "2023-07-31T09:32:08Z".parse().unwrap(),
					closed_at: "2023-07-31T09:32:08Z".parse().ok(),
					author: users::alex(),
					merged_at: "2023-07-31T09:32:08Z".parse().ok(),
					draft: false,
					head_sha: String::from("5556b6e5631a6f462d17cc0ef175e23b8efa9f00"),
					head_repo: Some(repos::marketplace()),
					base_sha: String::from("5558ea5cd98b89367fdf80b09d8796b093d2dac8"),
					base_repo: repos::marketplace(),
					requested_reviewers: vec![],
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
			assert_eq!(pull_request.id, 5555874031u64.into());
			assert_eq!(pull_request.repo_id, repos::marketplace().id);
			assert_eq!(pull_request.number, 5546u64.into());
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
			assert_eq!(pull_request.title, "Some merged PR");
			assert_eq!(
				pull_request.html_url,
				"https://github.com/onlydustxyz/marketplace/pull/5546"
			);
			assert_eq!(pull_request.closed_at, "2023-07-31T09:32:08".parse().ok());
			assert!(!pull_request.draft);
		}

		Ok(())
	}

	async fn should_project_unmerged_pull_request_events(&mut self) -> Result<()> {
		info!("should_project_unmerged_pull_request_events");

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
					status: GithubPullRequestStatus::Open,
					html_url: "https://github.com/onlydustxyz/marketplace/pull/1146"
						.parse()
						.unwrap(),
					created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
					updated_at: "2023-07-31T09:31:08Z".parse().unwrap(),
					closed_at: None,
					author: users::alex(),
					merged_at: None,
					draft: false,
					head_sha: String::from("7cf6b6e5631a6f462d17cc0ef175e23b8efa9f00"),
					head_repo: Some(repos::marketplace()),
					base_sha: String::from("fad8ea5cd98b89367fdf80b09d8796b093d2dac8"),
					base_repo: repos::marketplace(),
					requested_reviewers: vec![],
				})),
			)
			.await?;

		// Then
		let mut connection = self.context.database.client.connection()?;
		{
			let pull_requests: Vec<models::github_pull_requests::Inner> = retry(
				|| github_pull_requests::table.load(&mut *connection),
				|res| !res.is_empty(),
			)
			.await?;
			assert_eq!(pull_requests.len(), 2, "Invalid pull requests count");

			let pull_request = pull_requests[1].clone();
			assert_eq!(pull_request.id, 1455874031u64.into());
			assert_eq!(pull_request.repo_id, repos::marketplace().id);
			assert_eq!(pull_request.number, 1146u64.into());
			assert_eq!(
				pull_request.created_at,
				"2023-07-31T09:23:37".parse().unwrap()
			);
			assert_eq!(pull_request.author_id, users::alex().id);
			assert_eq!(pull_request.merged_at, None);
			assert_eq!(
				pull_request.status,
				infrastructure::database::enums::GithubPullRequestStatus::Open
			);
			assert_eq!(pull_request.title, "Hide tooltips on mobile");
			assert_eq!(
				pull_request.html_url,
				"https://github.com/onlydustxyz/marketplace/pull/1146"
			);
			assert_eq!(pull_request.closed_at, None);
			assert!(!pull_request.draft);
		}

		Ok(())
	}

	async fn should_project_full_pull_request_events(&mut self) -> Result<()> {
		info!("should_project_full_pull_request_events");

		// When
		self.context
			.amqp
			.publisher
			.publish(
				Destination::exchange(GITHUB_EVENTS_EXCHANGE),
				&UniqueMessage::new(Event::FullPullRequest(GithubFullPullRequest {
					inner: GithubPullRequest {
						id: 1455874031u64.into(),
						repo_id: repos::marketplace().id,
						number: 1146u64.into(),
						title: String::from("Hide tooltips on mobile"),
						status: GithubPullRequestStatus::Open,
						html_url: "https://github.com/onlydustxyz/marketplace/pull/1146"
							.parse()
							.unwrap(),
						created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
						updated_at: "2023-07-31T09:31:08Z".parse().unwrap(),
						closed_at: None,
						author: users::alex(),
						merged_at: None,
						draft: false,
						head_sha: String::from("7cf6b6e5631a6f462d17cc0ef175e23b8efa9f00"),
						head_repo: Some(repos::marketplace()),
						base_sha: String::from("fad8ea5cd98b89367fdf80b09d8796b093d2dac8"),
						base_repo: repos::marketplace(),
						requested_reviewers: vec![],
					},
					ci_checks: Some(GithubCiChecks::Passed),
					commits: Some(vec![commits::a(), commits::b(), commits::d()]),
					reviews: Some(vec![reviews::approved()]),
					closing_issue_numbers: Some(vec![GithubIssueNumber::from(1145u64)]),
				})),
			)
			.await?;

		// Then
		let mut connection = self.context.database.client.connection()?;
		{
			let pull_requests: Vec<models::github_pull_requests::Inner> = retry(
				|| github_pull_requests::table.load(&mut *connection),
				|res| !res.is_empty(),
			)
			.await?;
			assert_eq!(pull_requests.len(), 2, "Invalid pull requests count");

			let pull_request = pull_requests[1].clone();
			assert_eq!(pull_request.id, 1455874031u64.into());
			assert_eq!(pull_request.repo_id, repos::marketplace().id);
			assert_eq!(pull_request.number, 1146u64.into());
			assert_eq!(
				pull_request.created_at,
				"2023-07-31T09:23:37".parse().unwrap()
			);
			assert_eq!(pull_request.author_id, users::alex().id);
			assert_eq!(pull_request.merged_at, None);
			assert_eq!(
				pull_request.status,
				infrastructure::database::enums::GithubPullRequestStatus::Open
			);
			assert_eq!(pull_request.title, "Hide tooltips on mobile");
			assert_eq!(
				pull_request.html_url,
				"https://github.com/onlydustxyz/marketplace/pull/1146"
			);
			assert_eq!(pull_request.closed_at, None);
			assert!(!pull_request.draft);
			assert_eq!(
				pull_request.ci_checks,
				Some(infrastructure::database::enums::GithubCiChecks::Passed)
			);
			assert_eq!(
				pull_request.closing_issue_numbers.unwrap().0,
				vec![GithubIssueNumber::from(1145u64)]
			)
		}

		{
			let mut commits: Vec<models::github_pull_requests::Commit> =
				github_pull_request_commits::table.load(&mut *connection)?;
			assert_eq!(commits.len(), 3, "Invalid commits count");

			{
				let commit = commits.pop().unwrap();
				assert_eq!(commit.pull_request_id, 1455874031u64.into());
				assert_eq!(commit.sha, commits::d().sha);
				assert_eq!(commit.author_id, commits::d().author.id);
				assert_eq!(commit.html_url, commits::d().html_url.to_string());
			}

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
			let mut contributions: Vec<models::Contribution> = contributions::table
				.order((
					contributions::dsl::type_.desc(),
					contributions::dsl::user_id.desc(),
				))
				.load(&mut *connection)?;
			assert_eq!(contributions.len(), 3, "Invalid contributions count");

			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::PullRequest);
				assert_eq!(contribution.user_id, users::ofux().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1455874031u64).into()
				);
				assert_eq!(contribution.status, ContributionStatus::InProgress);
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
				assert_eq!(contribution.status, ContributionStatus::InProgress);
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
				assert_eq!(contribution.status, ContributionStatus::Complete);
			}
		}

		{
			let mut pending_contributors: Vec<models::ProjectsPendingContributor> =
				projects_pending_contributors::table.load(&mut *connection)?;
			assert_eq!(
				pending_contributors.len(),
				2,
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
				assert_eq!(pending_contributor.github_user_id, users::ofux().id);
			}
		}

		{
			let mut contributors: Vec<models::ProjectsContributor> =
				projects_contributors::table.load(&mut *connection)?;
			assert_eq!(contributors.len(), 1, "Invalid contributors count");

			{
				let contributor = contributors.pop().unwrap();
				assert_eq!(contributor.project_id, projects::project_id());
				assert_eq!(contributor.github_user_id, users::anthony().id);
			}
		}

		Ok(())
	}

	async fn should_update_full_pull_request_status(&mut self) -> Result<()> {
		info!("should_update_full_pull_request_status");

		// When
		self.context
			.amqp
			.publisher
			.publish(
				Destination::exchange(GITHUB_EVENTS_EXCHANGE),
				&UniqueMessage::new(Event::FullPullRequest(GithubFullPullRequest {
					inner: GithubPullRequest {
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
						head_sha: String::from("7cf6b6e5631a6f462d17cc0ef175e23b8efa9f00"),
						head_repo: Some(repos::marketplace()),
						base_sha: String::from("fad8ea5cd98b89367fdf80b09d8796b093d2dac8"),
						base_repo: repos::marketplace(),
						requested_reviewers: vec![],
					},
					ci_checks: None,
					commits: None,
					reviews: None,
					closing_issue_numbers: None,
				})),
			)
			.await?;

		// Then
		let mut connection = self.context.database.client.connection()?;
		{
			let pull_requests: Vec<models::github_pull_requests::Inner> = retry(
				|| github_pull_requests::table.load(&mut *connection),
				|res| !res.is_empty(),
			)
			.await?;
			assert_eq!(pull_requests.len(), 2, "Invalid pull requests count");

			let pull_request = pull_requests[1].clone();
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
			assert_eq!(
				pull_request.closing_issue_numbers.unwrap().0,
				vec![GithubIssueNumber::from(1145u64)]
			)
		}

		{
			let mut commits: Vec<models::github_pull_requests::Commit> =
				github_pull_request_commits::table.load(&mut *connection)?;
			assert_eq!(commits.len(), 3, "Invalid commits count");

			{
				let commit = commits.pop().unwrap();
				assert_eq!(commit.pull_request_id, 1455874031u64.into());
				assert_eq!(commit.sha, commits::d().sha);
				assert_eq!(commit.author_id, commits::d().author.id);
				assert_eq!(commit.html_url, commits::d().html_url.to_string());
			}

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
			let mut contributions: Vec<models::Contribution> = contributions::table
				.order((
					contributions::dsl::type_.desc(),
					contributions::dsl::user_id.desc(),
				))
				.load(&mut *connection)?;
			assert_eq!(contributions.len(), 3, "Invalid contributions count");

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
				assert_eq!(contribution.user_id, users::anthony().id);
				assert_eq!(
					contribution.details_id,
					GithubPullRequestId::from(1455874031u64).into()
				);
				assert_eq!(contribution.status, ContributionStatus::Complete);
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
				assert_eq!(contribution.status, ContributionStatus::Complete);
			}
		}

		{
			let pending_contributors: Vec<models::ProjectsPendingContributor> =
				projects_pending_contributors::table.load(&mut *connection)?;
			assert_eq!(
				pending_contributors.len(),
				0,
				"Invalid pending contributors count"
			);
		}

		{
			let mut contributors: Vec<models::ProjectsContributor> =
				projects_contributors::table.load(&mut *connection)?;
			assert_eq!(contributors.len(), 2, "Invalid contributors count");

			{
				let contributor = contributors.pop().unwrap();
				assert_eq!(contributor.project_id, projects::project_id());
				assert_eq!(contributor.github_user_id, users::anthony().id);
			}

			{
				let contributor = contributors.pop().unwrap();
				assert_eq!(contributor.project_id, projects::project_id());
				assert_eq!(contributor.github_user_id, users::ofux().id);
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
				&UniqueMessage::new(Event::FullPullRequest(GithubFullPullRequest {
					inner: GithubPullRequest {
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
						head_sha: String::from("7cf6b6e5631a6f462d17cc0ef175e23b8efa9f00"),
						head_repo: Some(repos::marketplace()),
						base_sha: String::from("fad8ea5cd98b89367fdf80b09d8796b093d2dac8"),
						base_repo: repos::marketplace(),
						requested_reviewers: vec![],
					},
					ci_checks: None,
					commits: Some(vec![commits::c()]),
					reviews: None,
					closing_issue_numbers: None,
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
			let mut contributions: Vec<models::Contribution> = contributions::table
				.filter(contributions::type_.eq(ContributionType::PullRequest))
				.load(&mut *connection)?;
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
				&UniqueMessage::new(Event::FullPullRequest(GithubFullPullRequest {
					inner: GithubPullRequest {
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
						head_sha: String::from("7cf6b6e5631a6f462d17cc0ef175e23b8efa9f00"),
						head_repo: Some(repos::marketplace()),
						base_sha: String::from("fad8ea5cd98b89367fdf80b09d8796b093d2dac8"),
						base_repo: repos::marketplace(),
						requested_reviewers: vec![],
					},
					ci_checks: None,
					commits: None,
					reviews: Some(vec![reviews::change_requested(), reviews::pending()]),
					closing_issue_numbers: None,
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
				.filter(contributions::type_.eq(ContributionType::CodeReview))
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

	async fn should_not_override_pull_request_when_none(&mut self) -> Result<()> {
		info!("should_not_override_pull_request_when_none");

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
					title: String::from("Another brick in the wall"),
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
					head_sha: String::from("7cf6b6e5631a6f462d17cc0ef175e23b8efa9f00"),
					head_repo: Some(repos::marketplace()),
					base_sha: String::from("fad8ea5cd98b89367fdf80b09d8796b093d2dac8"),
					base_repo: repos::marketplace(),
					requested_reviewers: vec![],
				})),
			)
			.await?;

		// Then
		let mut connection = self.context.database.client.connection()?;
		{
			let pull_requests: Vec<models::github_pull_requests::Inner> = retry(
				|| github_pull_requests::table.load(&mut *connection),
				|res: &[models::github_pull_requests::Inner]| {
					!res.is_empty() && res[0].title == "Another brick in the wall"
				},
			)
			.await?;
			assert_eq!(pull_requests.len(), 2, "Invalid pull requests count");

			let pull_request = pull_requests[1].clone();
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
			assert_eq!(pull_request.title, "Another brick in the wall");
			assert_eq!(
				pull_request.html_url,
				"https://github.com/onlydustxyz/marketplace/pull/1146"
			);
			assert_eq!(pull_request.closed_at, "2023-07-31T09:32:08".parse().ok());
			assert!(!pull_request.draft);
		}

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
				.order((contributions::type_.desc(), contributions::user_id.desc()))
				.load(&mut *connection)?;
			assert_eq!(contributions.len(), 3, "Invalid contributions count");

			{
				let contribution = contributions.pop().unwrap();
				assert_eq!(contribution.repo_id, repos::marketplace().id);
				assert_eq!(contribution.type_, ContributionType::PullRequest);
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
