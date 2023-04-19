use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::{GithubIssue, GithubIssueStatus, GithubIssueType, GithubRepositoryId, GithubUser};
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
		repo_id: &GithubRepositoryId,
		title: &str,
		description: &str,
	) -> Result<GithubIssue> {
		let response = self
			.query::<CreateIssue>(create_issue::Variables {
				repo_id: *repo_id,
				title: title.to_string(),
				description: description.to_string(),
			})
			.await?;

		response.internal_create_issue.try_into()
	}
}

impl TryFrom<create_issue::GithubIssue> for GithubIssue {
	type Error = anyhow::Error;

	fn try_from(issue: create_issue::GithubIssue) -> Result<Self, Self::Error> {
		Ok(Self::new(
			issue.id.try_into()?,
			issue.repo_id,
			issue.number.try_into()?,
			issue.type_.try_into()?,
			issue.title,
			issue.author.into(),
			issue.html_url,
			issue.status.try_into()?,
			issue.created_at,
			issue.merged_at,
			issue.closed_at,
		))
	}
}

impl From<create_issue::GithubUser> for GithubUser {
	fn from(user: create_issue::GithubUser) -> Self {
		Self::new(user.id, user.login, user.avatar_url, user.html_url)
	}
}

impl TryFrom<create_issue::Status> for GithubIssueStatus {
	type Error = anyhow::Error;

	fn try_from(status: create_issue::Status) -> Result<Self, Self::Error> {
		match status {
			create_issue::Status::CANCELLED => Ok(Self::Cancelled),
			create_issue::Status::CLOSED => Ok(Self::Closed),
			create_issue::Status::COMPLETED => Ok(Self::Completed),
			create_issue::Status::MERGED => Ok(Self::Merged),
			create_issue::Status::OPEN => Ok(Self::Open),
			create_issue::Status::Other(status) => Err(anyhow!("Unknown status {status}")),
		}
	}
}

impl TryFrom<create_issue::Type> for GithubIssueType {
	type Error = anyhow::Error;

	fn try_from(r#type: create_issue::Type) -> Result<Self, Self::Error> {
		match r#type {
			create_issue::Type::ISSUE => Ok(Self::Issue),
			create_issue::Type::PULL_REQUEST => Ok(Self::PullRequest),
			create_issue::Type::Other(r#type) => Err(anyhow!("Unknown type {type}")),
		}
	}
}
