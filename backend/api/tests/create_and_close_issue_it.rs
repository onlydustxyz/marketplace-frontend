#[macro_use]
extern crate diesel;

use anyhow::Result;
use rocket::http::{ContentType, Header, Status};
use rocket::serde::json::json;
use rstest::rstest;
use testcontainers::clients::Cli;

use api::presentation::http::routes::issues::create_issue;
use domain::ProjectId;
use infrastructure::database::Repository;
use olog::info;

use crate::{
	context::{Context, docker},
};
use crate::context::utils::jwt;

mod models;
mod context;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn create_and_close_issue(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_create_and_close_issue().await.expect("should_create_and_close_issue");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_create_and_close_issue(&mut self) -> Result<()> {
		info!("should_create_and_close_issue");
		// Given
		let id = ProjectId::new();
		let request = json!({
			"project_id": id.to_string(),
			"github_repo_id": 1111,
			"title": "issue-title",
			"description": "issue-description",
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/issues")
			.header(ContentType::JSON)
			.header(Header::new("Authorization", format!("Bearer {}", jwt(Some(id.to_string())))))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let created_issue: create_issue::Response = response.into_json().await.unwrap();
		assert_eq!(created_issue.id, 12345);
		Ok(())
	}
}
