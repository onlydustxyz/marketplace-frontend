use domain::GithubRepositoryId;
use juniper::{graphql_object, DefaultScalarValue};
use olog::{error, warn};

use super::{Context, Error};
use crate::domain::{GithubPullRequest, GithubRepository, GithubUser};

pub struct Query;

#[graphql_object(context=Context, Scalar = DefaultScalarValue)]
impl Query {
	pub fn hello_from_github_proxy(&self) -> &str {
		"Raclette!"
	}

	pub async fn fetch_repository_details(
		&self,
		context: &Context,
		id: i32,
	) -> Option<GithubRepository> {
		context
			.github_service()
			.ok()?
			.fetch_repository_by_id(id as u64)
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
			.fetch_user_by_name(&username)
			.await
			.map_err(Error::from)
			.logged()
			.ok()
	}

	pub async fn fetch_repository_PRs(
		&self,
		context: &Context,
		id: i32,
	) -> Option<Vec<GithubPullRequest>> {
		let repository_id = GithubRepositoryId::from(id as i64);
		context
			.github_service()
			.ok()?
			.fetch_repository_PRs(&repository_id)
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
		context
			.github_service()
			.ok()?
			.fetch_user_by_id(user_id as u64)
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
