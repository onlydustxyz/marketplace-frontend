use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::{GithubIssue, GithubIssueStatus, GithubRepoId, GithubUser};
use graphql_client::GraphQLQuery;
use infrastructure::graphql::{self, scalars::*};

use crate::domain::DustyBotService;

#[derive(GraphQLQuery)]
#[graphql(
	schema_path = "../common/infrastructure/src/graphql/__generated/graphql.schema.json",
	query_path = "src/infrastructure/dusty_bot/queries.graphql",
	response_derives = "Debug"
)]
struct CreateIssue;

#[async_trait]
impl DustyBotService for graphql::Client {
	async fn create_issue(
		&self,
		repo_id: GithubRepoId,
		title: String,
		description: String,
	) -> Result<GithubIssue> {
		let response = self
			.query::<CreateIssue>(create_issue::Variables {
				repo_id: repo_id.into(),
				title,
				description,
			})
			.await?;

		response.internal_create_issue.try_into()
	}
}

impl TryFrom<create_issue::GithubIssue> for GithubIssue {
	type Error = anyhow::Error;

	fn try_from(issue: create_issue::GithubIssue) -> Result<Self, Self::Error> {
		Ok(Self {
			id: issue.id.into(),
			repo_id: issue.repo_id.into(),
			number: issue.number.into(),
			title: issue.title,
			author: issue.author.into(),
			html_url: issue.html_url,
			status: issue.status.try_into()?,
			created_at: issue.created_at,
			updated_at: issue.updated_at,
			closed_at: issue.closed_at,
			assignees: vec![],
		})
	}
}

impl From<create_issue::GithubUser> for GithubUser {
	fn from(user: create_issue::GithubUser) -> Self {
		Self {
			id: user.id.into(),
			login: user.login,
			avatar_url: user.avatar_url,
			html_url: user.html_url,
		}
	}
}

impl TryFrom<create_issue::GithubIssueStatus> for GithubIssueStatus {
	type Error = anyhow::Error;

	fn try_from(status: create_issue::GithubIssueStatus) -> Result<Self, Self::Error> {
		match status {
			create_issue::GithubIssueStatus::CANCELLED => Ok(Self::Cancelled),
			create_issue::GithubIssueStatus::COMPLETED => Ok(Self::Completed),
			create_issue::GithubIssueStatus::OPEN => Ok(Self::Open),
			_ => Err(anyhow!("Unknown status {status:?}")),
		}
	}
}
