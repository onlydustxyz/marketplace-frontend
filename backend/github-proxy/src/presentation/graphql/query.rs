use domain::{GithubIssueNumber, GithubPullRequestNumber, GithubRepoId, GithubUserId};
use juniper::{graphql_object, DefaultScalarValue};
use olog::{error, warn};
use presentation::graphql::dto;

use super::{Context, Error};

pub struct Query;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Query {

	pub async fn fetch_user_details_by_id(
		&self,
		context: &Context,
		user_id: i32,
	) -> Option<dto::github::User> {
		let user_id = GithubUserId::from(user_id as i64);
		context
			.github_service()
			.ok()?
			.user_by_id(&user_id)
			.await
			.map(Into::into)
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
	) -> Option<Vec<dto::github::User>> {
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
			.map(|users| users.into_iter().map(Into::into).collect())
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
