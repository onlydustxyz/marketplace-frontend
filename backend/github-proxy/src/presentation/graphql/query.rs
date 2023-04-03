use domain::{
	GithubIssue, GithubIssueNumber, GithubRepo, GithubRepositoryId, GithubUser, GithubUserId,
};
use juniper::{graphql_object, DefaultScalarValue};
use olog::{error, warn};

use super::{dto, dto::AsStr, Context, Error};

pub struct Query;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Query {
	pub fn hello_from_github_proxy(&self) -> &str {
		"Raclette!"
	}

	pub async fn fetch_repository_details(&self, context: &Context, id: i32) -> Option<GithubRepo> {
		let repository_id = GithubRepositoryId::from(id as i64);
		context
			.github_service()
			.ok()?
			.repo_by_id(&repository_id)
			.await
			.map_err(Error::from)
			.logged()
			.ok()
	}

	pub async fn fetch_user_details(
		&self,
		context: &Context,
		username: String,
	) -> Option<GithubUser> {
		context
			.github_service()
			.ok()?
			.user(&username)
			.await
			.map_err(Error::from)
			.logged()
			.ok()
	}

	pub async fn fetch_pulls_by_repo_id(
		&self,
		context: &Context,
		repo_id: GithubRepositoryId,
		state: Option<dto::PullState>,
	) -> Option<Vec<GithubIssue>> {
		context
			.github_service()
			.ok()?
			.pulls_by_repo_id(&repo_id, state.unwrap_or_default().as_str())
			.await
			.map_err(Error::from)
			.logged()
			.ok()
	}

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

	pub async fn fetch_issue_by_repository_id(
		&self,
		context: &Context,
		repository_id: i32,
		issue_number: i32,
	) -> Option<GithubIssue> {
		let repository_id = GithubRepositoryId::from(repository_id as i64);
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

	pub async fn search_issues(
		&self,
		context: &Context,
		query: String,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<i32>,
		page: Option<i32>,
	) -> Option<Vec<GithubIssue>> {
		context
			.github_service_with_user_pat()
			.ok()?
			.issues(
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

trait Logged {
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
