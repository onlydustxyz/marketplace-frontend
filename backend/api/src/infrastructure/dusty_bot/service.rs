/// This module provides an implementation of the `DustyBotService` trait for a GraphQL API client.
use anyhow::{anyhow, Result};
use async_trait::async_trait;
use domain::{
    GithubIssue, GithubIssueNumber, GithubIssueStatus, GithubIssueType, GithubRepoId, GithubUser,
};
use graphql_client::GraphQLQuery;
use infrastructure::graphql::{self, scalars::*};

/// GraphQL query for creating a new issue.
#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "../common/infrastructure/src/graphql/__generated/graphql.schema.json",
    query_path = "src/infrastructure/dusty_bot/queries.graphql",
    response_derives = "Debug"
)]
struct CreateIssue;

#[async_trait]
impl DustyBotService for graphql::Client {
    /// Creates a new issue with the given title and description on the specified repository.
    ///
    /// # Arguments
    ///
    /// * `repo_id` - The ID of the repository where the issue should be created.
    /// * `title` - The title of the new issue.
    /// * `description` - A description of the new issue.
    ///
    /// # Returns
    ///
    /// Returns a `GithubIssue` struct representing the newly created issue on success, or an
    /// error if the creation failed.
    async fn create_issue(
        &self,
        repo_id: &GithubRepoId,
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

    /// Attempts to convert a `create_issue::GithubIssue` struct to a `GithubIssue` struct.
    ///
    /// # Arguments
    ///
    /// * `issue` - The `create_issue::GithubIssue` struct to convert.
    ///
    /// # Returns
    ///
    /// Returns a `GithubIssue` struct representing the converted GraphQL issue on success, or an
    /// error if the conversion failed.
    fn try_from(issue: create_issue::GithubIssue) -> Result<Self, Self::Error> {
        Ok(Self {
            id: issue.id,
            repo_id: issue.repo_id,
            number: issue.number,
            r#type: issue.type_.try_into()?,
            title: issue.title,
            author: issue.author.into(),
            html_url: issue.html_url,
            status: issue.status.try_into()?,
            created_at: issue.created_at,
            updated_at: issue.updated_at,
            merged_at: issue.merged_at,
            closed_at: issue.closed_at,
        })
    }
}

impl From<create_issue::GithubUser> for GithubUser {
    /// Converts a `create_issue::GithubUser` struct to a `GithubUser` struct.
    ///
    /// # Arguments
    ///
    /// * `user` - The `create_issue::GithubUser` struct to convert.
    ///
    /// # Returns
    ///
    /// Returns a `GithubUser` struct representing the converted GraphQL user.
    fn from(user: create_issue::GithubUser) -> Self {
        Self::new(user.id, user.login, user.avatar_url, user.html_url)
    }
}

impl TryFrom<create_issue::Status> for GithubIssueStatus {
    type Error = anyhow::Error;

    /// Attempts to convert a `create_issue::Status` enum to a `GithubIssueStatus` enum.
    ///
    /// # Arguments
    ///
    /// * `status` - The `create_issue::Status` enum to convert.
    ///
    /// # Returns
    ///
    /// Returns a `GithubIssueStatus` enum representing the converted GraphQL issue status on
    /// success, or an error if the conversion failed.
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

    /// Attempts to convert a `create_issue::Type` enum to a `GithubIssueType` enum.
    ///
    /// # Arguments
    ///
    /// * `type` - The `create_issue::Type` enum to convert.
    ///
    /// # Returns
    ///
    /// Returns a `GithubIssueType` enum representing the converted GraphQL issue type on
    /// success, or an error if the conversion failed.
    fn try_from(r#type: create_issue::Type) -> Result<Self, Self::Error> {
        match r#type {
            create_issue::Type::ISSUE => Ok(Self::Issue),
            create_issue::Type::PULL_REQUEST => Ok(Self::PullRequest),
            create_issue::Type::Other(r#type) => Err(anyhow!("Unknown type {type}")),
        }
    }
}