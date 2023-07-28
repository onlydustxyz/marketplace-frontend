use anyhow::Result;
use domain::{GithubRepo, GithubRepoId};
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

		Ok(())
	}
}
