use domain::{
	models::{pulls::PullRequest, *},
	ports::output::github_api::*,
};
use serde_json::json;

use crate::adapters::github_api::{Client, Error};

#[async_trait]
impl pull_request::Port for Client {
	async fn pull_request_by_repo_id(
		&self,
		repo_id: RepositoryId,
		pull_request_number: u64,
	) -> Result<PullRequest> {
		self.get_as(format!(
			"/repositories/{repo_id}/pulls/{pull_request_number}"
		))
		.await
		.map_err(Into::into)
	}

	async fn pull_request_by_repo_owner_name(
		&self,
		repo_owner: String,
		repo_name: String,
		pull_request_number: u64,
	) -> Result<PullRequest> {
		self.get_as(format!(
			"/repos/{repo_owner}/{repo_name}/pulls/{pull_request_number}"
		))
		.await
		.map_err(Into::into)
	}

	async fn pull_request_commits_by_repo_id(
		&self,
		repo_id: RepositoryId,
		pull_request_number: u64,
	) -> Result<Vec<repos::RepoCommit>> {
		self.get_as(format!(
			"/repositories/{repo_id}/pulls/{pull_request_number}/commits"
		))
		.await
		.map_err(Into::into)
	}

	async fn pull_request_reviews_by_repo_id(
		&self,
		repo_id: RepositoryId,
		pull_request_number: u64,
	) -> Result<Vec<pulls::Review>> {
		self.get_as(format!(
			"/repositories/{repo_id}/pulls/{pull_request_number}/reviews"
		))
		.await
		.map_err(Into::into)
	}

	async fn closing_issues_by_repo_owner_name(
		&self,
		repo_owner: String,
		repo_name: String,
		pull_request_number: u64,
	) -> Result<Vec<IssueId>> {
		let response: serde_json::Value = self
			.octocrab
			.post(
				"graphql",
				Some(&json!({
					"query": r#"query GetClosingIssues($owner: String!, $name: String!, $number: Int!) {
						repository(owner: $owner, name: $name) {
						 pullRequest(number: $number) {
						   closingIssuesReferences(first: 10) {
							 nodes {
							   databaseId
							 }
						   }
						 }
					   }
					 }"#,
					 "variables": {
						"owner": repo_owner,
						"name": repo_name,
						"number": pull_request_number,
					 }
				})),
			)
			.await
			.map_err(Error::Octocrab)?;

		let issue_ids = response
			.pointer("/data/repository/pullRequest/closingIssuesReferences/nodes")
			.and_then(|nodes| {
				nodes.as_array().map(|nodes| {
					nodes
						.iter()
						.filter_map(|node| {
							node.pointer("/databaseId")
								.and_then(|id| id.as_u64().map(IssueId::from))
						})
						.collect::<Vec<_>>()
				})
			})
			.unwrap_or_default();

		Ok(issue_ids)
	}
}
