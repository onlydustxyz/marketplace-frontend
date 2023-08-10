use std::collections::HashSet;

use anyhow::Result;
use domain::{
	GithubCiChecks, GithubCodeReview, GithubCodeReviewOutcome, GithubCodeReviewStatus,
	GithubFullPullRequest, GithubIssue, GithubIssueNumber, GithubIssueStatus, GithubPullRequest,
	GithubPullRequestStatus, GithubRepo, GithubUser,
};
use event_listeners::{listeners::github::Event, models::GithubRepoIndex, GITHUB_EVENTS_EXCHANGE};
use fixtures::{users::anthony, *};
use infrastructure::database::ImmutableRepository;
use olog::info;
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::context::{docker, github_indexer::Context};

mod context;
mod fixtures;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn new_github_repository_added(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_start_repository_indexing()
		.await
		.expect("should_start_repository_indexing");

	test.should_index_forks().await.expect("should_index_forks");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_start_repository_indexing(&mut self) -> Result<()> {
		info!("should_start_repository_indexing");

		// When
		self.context
			.database
			.client
			.insert(GithubRepoIndex::new(repos::marketplace().id))?;

		// Then
		expect_events(
			&mut self.context,
			vec![
				Event::Repo(repos::marketplace()),
				Event::Issue(GithubIssue {
					id: 1828603947u64.into(),
					repo_id: repos::marketplace().id,
					number: 1145u64.into(),
					title: String::from("Some issue to be resolved"),
					status: GithubIssueStatus::Open,
					html_url: "https://github.com/onlydustxyz/marketplace/issues/1145"
						.parse()
						.unwrap(),
					created_at: "2023-07-31T07:46:18Z".parse().unwrap(),
					updated_at: "2023-07-31T07:46:18Z".parse().unwrap(),
					closed_at: None,
					author: users::anthony(),
					assignees: vec![],
					comments_count: 0,
				}),
				Event::Issue(GithubIssue {
					id: 1822333508u64.into(),
					repo_id: repos::marketplace().id,
					number: 1141u64.into(),
					title: String::from("A cancelled issue"),
					status: GithubIssueStatus::Cancelled,
					html_url: "https://github.com/onlydustxyz/marketplace/issues/1141"
						.parse()
						.unwrap(),
					created_at: "2023-07-26T12:39:59Z".parse().unwrap(),
					updated_at: "2023-07-31T07:48:27Z".parse().unwrap(),
					closed_at: "2023-07-27T15:43:37Z".parse().ok(),
					author: users::anthony(),
					assignees: vec![],
					comments_count: 2,
				}),
				Event::Issue(GithubIssue {
					id: 1763108414u64.into(),
					repo_id: repos::marketplace().id,
					number: 1061u64.into(),
					title: String::from("A completed issue"),
					status: GithubIssueStatus::Completed,
					html_url: "https://github.com/onlydustxyz/marketplace/issues/1061"
						.parse()
						.unwrap(),
					created_at: "2023-06-19T09:16:20Z".parse().unwrap(),
					updated_at: "2023-07-31T07:49:25Z".parse().unwrap(),
					closed_at: "2023-07-31T07:49:13Z".parse().ok(),
					author: users::od_develop(),
					assignees: vec![],
					comments_count: 0,
				}),
				Event::PullRequest(pr_1144()),
				Event::PullRequest(pr_1146()),
				Event::PullRequest(pr_1152()),
				Event::FullPullRequest(GithubFullPullRequest {
					inner: pr_1144(),
					ci_checks: Some(GithubCiChecks::Failed),
					closing_issue_numbers: Some(vec![]),
					commits: Some(vec![commits::a(), commits::b()]),
					reviews: Some(vec![
						GithubCodeReview {
							reviewer: users::anthony(),
							status: GithubCodeReviewStatus::Pending,
							outcome: None,
							submitted_at: None,
						},
						GithubCodeReview {
							reviewer: users::ofux(),
							status: GithubCodeReviewStatus::Completed,
							outcome: Some(GithubCodeReviewOutcome::Approved),
							submitted_at: "2023-07-29T08:02:16Z".parse().ok(),
						},
					]),
				}),
				Event::FullPullRequest(GithubFullPullRequest {
					inner: pr_1146(),
					ci_checks: Some(GithubCiChecks::Passed),
					closing_issue_numbers: Some(vec![]),
					commits: Some(vec![commits::a(), commits::b()]),
					reviews: Some(vec![
						GithubCodeReview {
							reviewer: users::anthony(),
							status: GithubCodeReviewStatus::Pending,
							outcome: None,
							submitted_at: None,
						},
						GithubCodeReview {
							reviewer: users::ofux(),
							status: GithubCodeReviewStatus::Completed,
							outcome: Some(GithubCodeReviewOutcome::Approved),
							submitted_at: "2023-07-29T08:02:16Z".parse().ok(),
						},
					]),
				}),
				Event::FullPullRequest(GithubFullPullRequest {
					inner: pr_1152(),
					ci_checks: None,
					closing_issue_numbers: Some(vec![GithubIssueNumber::from(1145u64)]),
					commits: Some(vec![commits::a(), commits::b()]),
					reviews: Some(vec![
						GithubCodeReview {
							reviewer: users::anthony(),
							status: GithubCodeReviewStatus::Pending,
							outcome: Some(GithubCodeReviewOutcome::ChangeRequested),
							submitted_at: "2023-08-07T16:52:12Z".parse().ok(),
						},
						GithubCodeReview {
							reviewer: users::ofux(),
							status: GithubCodeReviewStatus::Completed,
							outcome: Some(GithubCodeReviewOutcome::Approved),
							submitted_at: "2023-07-29T08:02:16Z".parse().ok(),
						},
					]),
				}),
			],
		)
		.await;

		Ok(())
	}

	async fn should_index_forks(&mut self) -> Result<()> {
		info!("should_index_forks");

		// When
		self.context
			.database
			.client
			.insert(GithubRepoIndex::new(repos::marketplace_fork().id))?;

		// Then
		expect_events(
			&mut self.context,
			vec![Event::Repo(repos::marketplace_fork())],
		)
		.await;

		Ok(())
	}
}

async fn expect_events(context: &mut Context<'_>, mut expected: Vec<Event>) {
	let mut actual = HashSet::<Event>::new();
	for _ in 0..expected.len() {
		actual.insert(context.amqp.listen::<Event>(GITHUB_EVENTS_EXCHANGE).await.unwrap());
	}

	let mut actual: Vec<_> = actual.into_iter().collect();
	actual.sort();
	expected.sort();

	assert_eq!(
		actual,
		expected,
		"Invalid events, expected: {}. received: {}",
		serde_json::to_string(&expected).unwrap(),
		serde_json::to_string(&actual).unwrap()
	);
}

fn pr_1144() -> GithubPullRequest {
	GithubPullRequest {
		id: 1452363285u64.into(),
		repo_id: repos::marketplace().id,
		number: 1144u64.into(),
		title: String::from("Improve impersonation"),
		status: GithubPullRequestStatus::Closed,
		html_url: "https://github.com/onlydustxyz/marketplace/pull/1144".parse().unwrap(),
		created_at: "2023-07-27T16:46:00Z".parse().unwrap(),
		updated_at: "2023-07-28T08:34:54Z".parse().unwrap(),
		closed_at: "2023-07-28T08:34:53Z".parse().ok(),
		author: users::ofux(),
		merged_at: None,
		draft: false,
		head_sha: String::from("1c20736f7cd8ebab4d915661c57fc8a987626f9b"),
		head_repo: Some(repos::marketplace()),
		base_sha: String::from("3fb55612f69b5352997b4aeafdeea958c564074f"),
		base_repo: repos::marketplace(),
		requested_reviewers: vec![anthony()],
	}
}

fn pr_1146() -> GithubPullRequest {
	GithubPullRequest {
		id: 1455874031u64.into(),
		repo_id: repos::marketplace().id,
		number: 1146u64.into(),
		title: String::from("Hide tooltips on mobile"),
		status: GithubPullRequestStatus::Merged,
		html_url: "https://github.com/onlydustxyz/marketplace/pull/1146".parse().unwrap(),
		created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
		updated_at: "2023-07-31T09:32:08Z".parse().unwrap(),
		closed_at: "2023-07-31T09:32:08Z".parse().ok(),
		author: users::alex(),
		merged_at: "2023-07-31T09:32:08Z".parse().ok(),
		draft: false,
		head_sha: String::from("559e878ff141f16885f2372456dffdb2cb223843"),
		head_repo: Some(repos::marketplace()),
		base_sha: String::from("979a35c6fe75aa304d1ad5a4b7d222ecfd308dc3"),
		base_repo: repos::marketplace(),
		requested_reviewers: vec![anthony()],
	}
}

fn pr_1152() -> GithubPullRequest {
	GithubPullRequest {
		id: 1458220740u64.into(),
		repo_id: repos::marketplace().id,
		number: 1152u64.into(),
		title: String::from("[E-642] Index extra fields in github pull requests"),
		status: GithubPullRequestStatus::Open,
		html_url: "https://github.com/onlydustxyz/marketplace/pull/1152".parse().unwrap(),
		created_at: "2023-08-01T14:26:33Z".parse().unwrap(),
		updated_at: "2023-08-01T14:26:41Z".parse().unwrap(),
		closed_at: None,
		author: GithubUser {
			id: 43467246u64.into(),
			login: String::from("AnthonyBuisset"),
			avatar_url: "https://avatars.githubusercontent.com/u/43467246?v=4".parse().unwrap(),
			html_url: "https://github.com/AnthonyBuisset".parse().unwrap(),
		},
		merged_at: None,
		draft: true,
		head_sha: String::from("7cf6b6e5631a6f462d17cc0ef175e23b8efa9f00"),
		head_repo: Some(GithubRepo {
			parent: None,
			..repos::marketplace_fork()
		}),
		base_sha: String::from("fad8ea5cd98b89367fdf80b09d8796b093d2dac8"),
		base_repo: repos::marketplace(),
		requested_reviewers: vec![],
	}
}
