use std::time::Duration;

use anyhow::Result;
use diesel::query_dsl::RunQueryDsl;
use domain::{
	Destination, GithubCiChecks, GithubCommit, GithubPullRequest, GithubPullRequestStatus,
	GithubUser, Publisher,
};
use event_listeners::{listeners::github::Event, models, GITHUB_EVENTS_EXCHANGE};
use infrastructure::{
	amqp::UniqueMessage,
	database::schema::{github_pull_request_commits, github_pull_requests},
};
use olog::info;
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::context::{docker, event_listeners::Context};

mod context;

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
					repo_id: 498695724u64.into(),
					number: 1146u64.into(),
					title: String::from("Hide tooltips on mobile"),
					status: GithubPullRequestStatus::Merged,
					html_url: "https://github.com/onlydustxyz/marketplace/pull/1146"
						.parse()
						.unwrap(),
					created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
					updated_at: "2023-07-31T09:32:08Z".parse().unwrap(),
					closed_at: "2023-07-31T09:32:08Z".parse().ok(),
					author: alex(),
					merged_at: "2023-07-31T09:32:08Z".parse().ok(),
					draft: false,
					ci_checks: Some(GithubCiChecks::Passed),
					commits: commits(),
					reviews: vec![],
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
			assert_eq!(pull_request.repo_id, 498695724u64.into());
			assert_eq!(pull_request.number, 1146u64.into());
			assert_eq!(
				pull_request.created_at,
				"2023-07-31T09:23:37".parse().unwrap()
			);
			assert_eq!(pull_request.author_id, 10922658u64.into());
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
				assert_eq!(commit.sha, "32a353fdfb17b0b2e5328174309ecfa01e4780e5");
				assert_eq!(commit.author_id, 43467246u64.into());
				assert_eq!(
					commit.html_url,
					"https://github.com/onlydustxyz/marketplace/commit/32a353fdfb17b0b2e5328174309ecfa01e4780e5"
				);
			}

			{
				let commit = commits.pop().unwrap();
				assert_eq!(commit.pull_request_id, 1455874031u64.into());
				assert_eq!(commit.sha, "3e8b02526187e828f213864d16110d0982534809");
				assert_eq!(commit.author_id, 43467246u64.into());
				assert_eq!(
					commit.html_url,
					"https://github.com/onlydustxyz/marketplace/commit/3e8b02526187e828f213864d16110d0982534809"
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
					repo_id: 498695724u64.into(),
					number: 1146u64.into(),
					title: String::from("updated"),
					status: GithubPullRequestStatus::Merged,
					html_url: "https://github.com/onlydustxyz/marketplace/pull/1146"
						.parse()
						.unwrap(),
					created_at: "2023-07-31T09:23:37Z".parse().unwrap(),
					updated_at: "2023-07-31T09:32:08Z".parse().unwrap(),
					closed_at: "2023-07-31T09:32:08Z".parse().ok(),
					author: alex(),
					merged_at: "2023-07-31T09:32:08Z".parse().ok(),
					draft: false,
					ci_checks: Some(GithubCiChecks::Passed),
					commits: other_commits(),
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
			assert_eq!(commit.sha, "b83f75bf3d86cdf017c0f743dcf29dcffdb0ab97");
			assert_eq!(commit.author_id, 10922658u64.into());
			assert_eq!(
				commit.html_url,
				"https://github.com/onlydustxyz/marketplace/commit/b83f75bf3d86cdf017c0f743dcf29dcffdb0ab97"
			);
		}

		Ok(())
	}
}

async fn retry<R, E, F: FnMut() -> std::result::Result<Vec<R>, E>, C: FnMut(&[R]) -> bool>(
	mut callback: F,
	mut check: C,
) -> std::result::Result<Vec<R>, E> {
	let mut results: Vec<R> = vec![];
	while !check(&results) {
		tokio::time::sleep(Duration::from_secs(1)).await;
		results = callback()?;
	}
	Ok(results)
}

fn anthony() -> GithubUser {
	GithubUser {
		id: 43467246u64.into(),
		login: String::from("AnthonyBuisset"),
		avatar_url: "https://avatars.githubusercontent.com/u/43467246?v=4".parse().unwrap(),
		html_url: "https://github.com/AnthonyBuisset".parse().unwrap(),
	}
}

fn alex() -> GithubUser {
	GithubUser {
		id: 10922658u64.into(),
		login: String::from("alexbensimon"),
		avatar_url: "https://avatars.githubusercontent.com/u/10922658?v=4".parse().unwrap(),
		html_url: "https://github.com/alexbensimon".parse().unwrap(),
	}
}

fn commits() -> Vec<GithubCommit> {
	vec![
		GithubCommit {
		sha: String::from("3e8b02526187e828f213864d16110d0982534809"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/3e8b02526187e828f213864d16110d0982534809".parse().unwrap(),
		author: anthony(),
		},
		GithubCommit {
			sha: String::from("32a353fdfb17b0b2e5328174309ecfa01e4780e5"),
			html_url: "https://github.com/onlydustxyz/marketplace/commit/32a353fdfb17b0b2e5328174309ecfa01e4780e5".parse().unwrap(),
			author: anthony(),
		}
	]
}

fn other_commits() -> Vec<GithubCommit> {
	vec![
		GithubCommit {
		sha: String::from("b83f75bf3d86cdf017c0f743dcf29dcffdb0ab97"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/b83f75bf3d86cdf017c0f743dcf29dcffdb0ab97".parse().unwrap(),
		author: alex(),
		},
	]
}
