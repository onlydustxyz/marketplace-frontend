use std::collections::HashSet;

use anyhow::Result;
use domain::{
	GithubCiChecks, GithubIssue, GithubIssueStatus, GithubPullRequest, GithubPullRequestStatus,
	GithubRepo, GithubRepoId, GithubUser,
};
use event_listeners::{listeners::github::Event, models::GithubRepoIndex, GITHUB_EVENTS_EXCHANGE};
use infrastructure::database::ImmutableRepository;
use olog::info;
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::context::{docker, Context};

mod context;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn new_github_repository_added(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_start_repository_indexing()
		.await
		.expect("should_start_repository_indexing");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_start_repository_indexing(&mut self) -> Result<()> {
		info!("should_start_repository_indexing");

		let repo_id = GithubRepoId::from(498695724u64);

		// When
		self.context.database.client.insert(GithubRepoIndex::new(repo_id))?;

		// Then
		expect_events(
			&mut self.context,
			vec![
				Event::Repo(GithubRepo {
					id: repo_id,
					owner: String::from("onlydustxyz"),
					name: String::from("marketplace"),
					logo_url: "https://avatars.githubusercontent.com/u/98735558?v=4"
						.parse()
						.unwrap(),
					html_url: "https://github.com/onlydustxyz/marketplace".parse().unwrap(),
					description: String::from("Contributions marketplace backend services"),
					stars: 13,
					forks_count: 8,
				}),
				Event::Issue(GithubIssue {
					id: 1828603947u64.into(),
					repo_id,
					number: 1145u64.into(),
					title: String::from("Some issue to be resolved"),
					status: GithubIssueStatus::Open,
					html_url: "https://github.com/onlydustxyz/marketplace/issues/1145"
						.parse()
						.unwrap(),
					created_at: "2023-07-31T07:46:18Z".parse().unwrap(),
					updated_at: "2023-07-31T07:46:18Z".parse().unwrap(),
					closed_at: None,
					author: GithubUser {
						id: 43467246u64.into(),
						login: String::from("AnthonyBuisset"),
						avatar_url: "https://avatars.githubusercontent.com/u/43467246?v=4"
							.parse()
							.unwrap(),
						html_url: "https://github.com/AnthonyBuisset".parse().unwrap(),
					},
					assignees: vec![],
					comments_count: 0,
				}),
				Event::Issue(GithubIssue {
					id: 1822333508u64.into(),
					repo_id,
					number: 1141u64.into(),
					title: String::from("A cancelled issue"),
					status: GithubIssueStatus::Cancelled,
					html_url: "https://github.com/onlydustxyz/marketplace/issues/1141"
						.parse()
						.unwrap(),
					created_at: "2023-07-26T12:39:59Z".parse().unwrap(),
					updated_at: "2023-07-31T07:48:27Z".parse().unwrap(),
					closed_at: "2023-07-27T15:43:37Z".parse().ok(),
					author: GithubUser {
						id: 43467246u64.into(),
						login: String::from("AnthonyBuisset"),
						avatar_url: "https://avatars.githubusercontent.com/u/43467246?v=4"
							.parse()
							.unwrap(),
						html_url: "https://github.com/AnthonyBuisset".parse().unwrap(),
					},
					assignees: vec![],
					comments_count: 2,
				}),
				Event::Issue(GithubIssue {
					id: 1763108414u64.into(),
					repo_id,
					number: 1061u64.into(),
					title: String::from("A completed issue"),
					status: GithubIssueStatus::Completed,
					html_url: "https://github.com/onlydustxyz/marketplace/issues/1061"
						.parse()
						.unwrap(),
					created_at: "2023-06-19T09:16:20Z".parse().unwrap(),
					updated_at: "2023-07-31T07:49:25Z".parse().unwrap(),
					closed_at: "2023-07-31T07:49:13Z".parse().ok(),
					author: GithubUser {
						id: 136718082u64.into(),
						login: String::from("od-develop"),
						avatar_url: "https://avatars.githubusercontent.com/u/136718082?v=4"
							.parse()
							.unwrap(),
						html_url: "https://github.com/od-develop".parse().unwrap(),
					},
					assignees: vec![],
					comments_count: 0,
				}),
				Event::PullRequest(GithubPullRequest {
					id: 1455874031u64.into(),
					repo_id,
					number: 1146u64.into(),
					title: String::from("Hide tooltips on mobile"),
					status: GithubPullRequestStatus::Merged,
					html_url: "https://github.com/onlydustxyz/marketplace/pull/1146"
						.parse()
						.unwrap(),
					created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
					updated_at: "2023-07-31T09:32:08Z".parse().unwrap(),
					closed_at: "2023-07-31T09:32:08Z".parse().ok(),
					author: GithubUser {
						id: 10922658u64.into(),
						login: String::from("alexbensimon"),
						avatar_url: "https://avatars.githubusercontent.com/u/10922658?v=4"
							.parse()
							.unwrap(),
						html_url: "https://github.com/alexbensimon".parse().unwrap(),
					},
					merged_at: "2023-07-31T09:32:08Z".parse().ok(),
					draft: false,
					ci_checks: Some(GithubCiChecks::Passed),
				}),
				Event::PullRequest(GithubPullRequest {
					id: 1458220740u64.into(),
					repo_id,
					number: 1152u64.into(),
					title: String::from("[E-642] Index extra fields in github pull requests"),
					status: GithubPullRequestStatus::Open,
					html_url: "https://github.com/onlydustxyz/marketplace/pull/1152"
						.parse()
						.unwrap(),
					created_at: "2023-08-01T14:26:33Z".parse().unwrap(),
					updated_at: "2023-08-01T14:26:41Z".parse().unwrap(),
					closed_at: None,
					author: GithubUser {
						id: 43467246u64.into(),
						login: String::from("AnthonyBuisset"),
						avatar_url: "https://avatars.githubusercontent.com/u/43467246?v=4"
							.parse()
							.unwrap(),
						html_url: "https://github.com/AnthonyBuisset".parse().unwrap(),
					},
					merged_at: None,
					draft: true,
					ci_checks: None,
				}),
				Event::PullRequest(GithubPullRequest {
					id: 1452363285u64.into(),
					repo_id,
					number: 1144u64.into(),
					title: String::from("Improve impersonation"),
					status: GithubPullRequestStatus::Closed,
					html_url: "https://github.com/onlydustxyz/marketplace/pull/1144"
						.parse()
						.unwrap(),
					created_at: "2023-07-27T16:46:00Z".parse().unwrap(),
					updated_at: "2023-07-28T08:34:54Z".parse().unwrap(),
					closed_at: "2023-07-28T08:34:53Z".parse().ok(),
					author: GithubUser {
						id: 595505u64.into(),
						login: String::from("ofux"),
						avatar_url: "https://avatars.githubusercontent.com/u/595505?v=4"
							.parse()
							.unwrap(),
						html_url: "https://github.com/ofux".parse().unwrap(),
					},
					merged_at: None,
					draft: false,
					ci_checks: Some(GithubCiChecks::Failed),
				}),
			],
		)
		.await;

		Ok(())
	}
}

async fn expect_events(context: &mut Context<'_>, expected: Vec<Event>) {
	let mut actual = HashSet::<Event>::new();
	for _ in 0..expected.len() {
		actual.insert(context.amqp.listen::<Event>(GITHUB_EVENTS_EXCHANGE).await.unwrap());
	}

	let expected = expected.into_iter().collect();

	assert_eq!(
		actual,
		expected,
		"Invalid events, expected: {}. received: {}",
		serde_json::to_string(&expected).unwrap(),
		serde_json::to_string(&actual).unwrap()
	);
}
