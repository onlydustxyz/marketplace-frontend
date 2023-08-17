use anyhow::Result;
use diesel::query_dsl::RunQueryDsl;
use domain::{Destination, GithubIssue, GithubIssueId, GithubIssueStatus, Publisher};
use event_listeners::{listeners::github::Event, models, GITHUB_EVENTS_EXCHANGE};
use fixtures::*;
use infrastructure::{
	amqp::UniqueMessage,
	database::{
		enums::{ContributionStatus, ContributionType},
		schema::{contributions, github_issues},
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
pub async fn issue_projection_it(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_project_issue_events().await.expect("should_project_issue_events");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_project_issue_events(&mut self) -> Result<()> {
		info!("should_project_issue_events");

		// When
		self.context
			.amqp
			.publisher
			.publish(
				Destination::exchange(GITHUB_EVENTS_EXCHANGE),
				&UniqueMessage::new(Event::Issue(GithubIssue {
					id: 1358746346u64.into(),
					repo_id: repos::marketplace().id,
					number: 188u64.into(),
					created_at: "2022-09-01T12:09:44Z".parse().unwrap(),
					updated_at: "2022-11-23T14:54:39Z".parse().unwrap(),
					author: users::stan(),
					status: GithubIssueStatus::Completed,
					title: String::from("Find a way to always apply the aggregate events"),
					html_url: "https://github.com/onlydustxyz/marketplace/issues/188"
						.parse()
						.unwrap(),
					closed_at: "2022-11-23T14:54:39Z".parse().ok(),
					assignees: vec![users::anthony()],
					comments_count: 12,
				})),
			)
			.await?;

		// Then
		let mut connection = self.context.database.client.connection()?;
		{
			let mut issues: Vec<models::GithubIssue> = retry(
				|| github_issues::table.load(&mut *connection),
				|res| !res.is_empty(),
			)
			.await?;
			assert_eq!(issues.len(), 1, "Invalid pull requests count");

			let issue = issues.pop().unwrap();
			assert_eq!(issue.id, 1358746346u64.into());
			assert_eq!(issue.repo_id, repos::marketplace().id);
			assert_eq!(issue.number, 188u64.into());
			assert_eq!(issue.created_at, "2022-09-01T12:09:44".parse().unwrap());
			assert_eq!(issue.author_id, 4435377u64.into());
			assert_eq!(
				issue.status,
				infrastructure::database::enums::GithubIssueStatus::Completed
			);
			assert_eq!(
				issue.title,
				"Find a way to always apply the aggregate events"
			);
			assert_eq!(
				issue.html_url,
				"https://github.com/onlydustxyz/marketplace/issues/188"
			);
			assert_eq!(issue.closed_at, "2022-11-23T14:54:39".parse().ok());
			assert_eq!(issue.assignee_ids.0, vec![users::anthony().id]);
		}

		{
			let mut contributions: Vec<models::Contribution> =
				contributions::table.load(&mut *connection)?;
			assert_eq!(contributions.len(), 1, "Invalid contributions count");

			let contribution = contributions.pop().unwrap();
			assert_eq!(contribution.repo_id, repos::marketplace().id);
			assert_eq!(contribution.type_, ContributionType::Issue);
			assert_eq!(contribution.user_id, users::anthony().id);
			assert_eq!(
				contribution.details_id,
				GithubIssueId::from(1358746346u64).into()
			);
			assert_eq!(contribution.status_, ContributionStatus::Complete);
		}

		Ok(())
	}
}
