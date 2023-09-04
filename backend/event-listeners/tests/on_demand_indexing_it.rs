use anyhow::Result;
use domain::GithubCodeReviewStatus;
use olog::info;
use rocket::http::Status;
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::{
	context::{docker, github_indexer::Context},
	fixtures::*,
};

mod context;
mod fixtures;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn on_demand_indexing_it(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_index_repo().await.expect("should_index_repo");
	test.should_index_user().await.expect("should_index_user");
	test.should_index_pr().await.expect("should_index_pr");
	test.should_index_issue().await.expect("should_index_issue");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_index_repo(&mut self) -> Result<()> {
		info!("should_index_repo");

		{
			// When
			let response = self
				.context
				.http_client
				.post(format!("/indexer/repo/{}", repos::marketplace().id))
				.dispatch()
				.await;

			// Then
			assert_eq!(response.status(), Status::Ok);
		}

		repos::assert_is_indexed(&mut self.context, repos::marketplace())?;

		Ok(())
	}

	async fn should_index_user(&mut self) -> Result<()> {
		info!("should_index_user");

		{
			// When
			let response = self
				.context
				.http_client
				.post(format!("/indexer/user/{}", users::anthony().id))
				.dispatch()
				.await;

			// Then
			assert_eq!(response.status(), Status::Ok);
		}

		users::assert_is_indexed(&mut self.context, users::anthony())?;

		Ok(())
	}

	async fn should_index_pr(&mut self) -> Result<()> {
		info!("should_index_pr");

		{
			// When
			let response = self
				.context
				.http_client
				.post(format!(
					"/indexer/repo/{}/pull_request/1146",
					repos::marketplace().id
				))
				.dispatch()
				.await;

			// Then
			assert_eq!(response.status(), Status::Ok);
		}

		pull_requests::assert_is_indexed(&mut self.context, pull_requests::x1146())?;

		commits::assert_indexed(
			&mut self.context,
			vec![
				(commits::c(), pull_requests::x1146().id),
				(commits::d(), pull_requests::x1146().id),
				(commits::e(), pull_requests::x1146().id),
			],
		)?;

		reviews::assert_indexed(
			&mut self.context,
			vec![(
				reviews::requested(GithubCodeReviewStatus::Pending),
				pull_requests::x1146().id,
			)],
		)?;

		Ok(())
	}

	async fn should_index_issue(&mut self) -> Result<()> {
		info!("should_index_issue");

		{
			// When
			let response = self
				.context
				.http_client
				.post(format!(
					"/indexer/repo/{}/issue/1141",
					repos::marketplace().id
				))
				.dispatch()
				.await;

			// Then
			assert_eq!(response.status(), Status::Ok);
		}

		issues::assert_indexed(&mut self.context, vec![issues::x1141()])?;

		Ok(())
	}
}
