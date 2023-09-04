use anyhow::Result;
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
}
