use std::time::Duration;

use anyhow::Result;
use diesel::query_dsl::RunQueryDsl;
use domain::{
	Destination, GithubCiChecks, GithubCommit, GithubPullRequest, GithubPullRequestStatus,
	GithubUser, Publisher,
};
use event_listeners::{listeners::github::Event, models, GITHUB_EVENTS_EXCHANGE};
use infrastructure::{amqp::UniqueMessage, database::schema::github_pull_requests};
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
				})),
			)
			.await?;

		// Then
		let mut connection = self.context.database.client.connection()?;
		let mut pull_requests: Vec<models::GithubPullRequest> =
			retry(|| github_pull_requests::table.load(&mut *connection)).await?;
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
		assert_eq!(pull_request.draft, false);
		assert_eq!(
			pull_request.ci_checks,
			Some(infrastructure::database::enums::GithubCiChecks::Passed)
		);

		Ok(())
	}
}

async fn retry<R, E, F: FnMut() -> std::result::Result<Vec<R>, E>>(
	mut callback: F,
) -> std::result::Result<Vec<R>, E> {
	let mut results: Vec<R> = vec![];
	while results.len() == 0 {
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
