#![deny(missing_docs)]
//! This module provides a GraphQL query implementation that fetches data from the Github API.
use domain::{GithubIssue, GithubIssueNumber, GithubRepoId, GithubUser, GithubUserId};
use juniper::{graphql_object, DefaultScalarValue};
use olog::{error, warn};

use super::{Context, Error};

/// A query object for fetching data from Github API.
pub struct Query;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Query {
	/// Fetches Github issue by issue number.
	/// `repo_owner` - Owner of the repository to which the issue belongs.
	/// `repo_name` - Name of the repository to which the issue belongs.
	/// `issue_number` - Issue number.
	pub async fn fetch_issue(
		&self,
		context: &Context,
		repo_owner: String,
		repo_name: String,
		issue_number: i32,
	) -> Option<domain::GithubIssue> {
		let issue_number = GithubIssueNumber::from(issue_number as i64);
		context
			.github_service()
			.ok()?
			.issue(&repo_owner, &repo_name, &issue_number)
			.await
			.map_err(Error::from)
			.logged()
			.ok()
	}

	/// Fetches Github issue by repository ID and issue number.
	/// `repository_id` - ID of the repository to which the issue belongs.
	/// `issue_number` - Issue number.
	pub async fn fetch_issue_by_repository_id(
		&self,
		context: &Context,
		repository_id: i32,
		issue_number: i32,
	) -> Option<GithubIssue> {
		let repository_id = GithubRepoId::from(repository_id as i64);
		let issue_number = GithubIssueNumber::from(issue_number as i64);
		context
			.github_service()
			.ok()?
			.issue_by_repo_id(&repository_id, &issue_number)
			.await
			.map_err(Error::from)
			.logged()
			.ok()
	}

	/// Fetches Github user details by user ID.
	/// `user_id` - ID of the user.
	pub async fn fetch_user_details_by_id(
		&self,
		context: &Context,
		user_id: i32,
	) -> Option<GithubUser> {
		let user_id = GithubUserId::from(user_id as i64);
		context
			.github_service()
			.ok()?
			.user_by_id(&user_id)
			.await
			.map_err(Error::from)
			.logged()
			.ok()
	}

	/// Searches Github users based on query string, sort order, search order and pagination.
	/// `query` - Search query string.
	/// `sort` - Sort order. Defaults to `None`.
	/// `order` - Search order. Defaults to `None`.
	/// `per_page` - Number of results per page. Defaults to `None`.
	/// `page` - Page number. Defaults to `None`.
	pub async fn search_users(
		&self,
		context: &Context,
		query: String,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<i32>,
		page: Option<i32>,
	) -> Option<Vec<GithubUser>> {
		context
			.github_service_with_user_pat()
			.ok()?
			.users(
				&query,
				sort,
				order,
				per_page.and_then(|n| u8::try_from(n).ok()),
				page.and_then(|n| u32::try_from(n).ok()),
			)
			.await
			.map_err(Error::from)
			.logged()
			.ok()
	}
}

/// A trait for logging errors in `Result` objects.
trait Logged {
	/// Logs and returns `self`.
	fn logged(self) -> Self;
}

impl<T> Logged for Result<T, Error> {
	fn logged(self) -> Self {
		if let Err(error) = &self {
			match error {
				Error::InvalidRequest(_) => warn!(error = format!("{error:?}"), "Bad request"),
				Error::InternalError(_) => error!(error = format!("{error:?}"), "Error occured"),
			};
		}
		self
	}
}