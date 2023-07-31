use anyhow::Result;
use domain::{GithubIssue, GithubIssueStatus, GithubRepo, GithubRepoId, GithubUser};
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
		assert_eq!(
			self.context.amqp.listen::<Event>(GITHUB_EVENTS_EXCHANGE).await,
			Some(Event::Repo(GithubRepo {
				id: repo_id,
				owner: String::from("onlydustxyz"),
				name: String::from("marketplace"),
				logo_url: "https://avatars.githubusercontent.com/u/98735558?v=4".parse().unwrap(),
				html_url: "https://github.com/onlydustxyz/marketplace".parse().unwrap(),
				description: String::from("Contributions marketplace backend services"),
				stars: 13,
				forks_count: 8,
			}))
		);

		assert_eq!(
			self.context.amqp.listen::<Event>(GITHUB_EVENTS_EXCHANGE).await,
			Some(Event::Issue(GithubIssue {
				id: 1828603947u64.into(),
				repo_id,
				number: 1145u64.into(),
				title: String::from("Some issue to be resolved"),
				status: GithubIssueStatus::Open,
				html_url: "https://github.com/onlydustxyz/marketplace/issues/1145".parse().unwrap(),
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
				assignees: vec![]
			}))
		);

		assert_eq!(
			self.context.amqp.listen::<Event>(GITHUB_EVENTS_EXCHANGE).await,
			Some(Event::Issue(GithubIssue {
				id: 1822333508u64.into(),
				repo_id,
				number: 1141u64.into(),
				title: String::from("A cancelled issue"),
				status: GithubIssueStatus::Cancelled,
				html_url: "https://github.com/onlydustxyz/marketplace/issues/1141".parse().unwrap(),
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
				assignees: vec![]
			}))
		);

		assert_eq!(
			self.context.amqp.listen::<Event>(GITHUB_EVENTS_EXCHANGE).await,
			Some(Event::Issue(GithubIssue {
				id: 1763108414u64.into(),
				repo_id,
				number: 1061u64.into(),
				title: String::from("A completed issue"),
				status: GithubIssueStatus::Completed,
				html_url: "https://github.com/onlydustxyz/marketplace/issues/1061".parse().unwrap(),
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
				assignees: vec![]
			}))
		);

		Ok(())
	}
}
