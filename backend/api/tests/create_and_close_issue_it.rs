#[macro_use]
extern crate diesel;

use anyhow::Result;
use rocket::http::{ContentType, Header, Status};
use rocket::serde::json::json;
use rstest::rstest;
use testcontainers::clients::Cli;

use api::presentation::http::routes::issues::create_issue;
use olog::info;

use crate::{
	context::{Context, docker},
};

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
		const JWT: &str = "eyJhbGciOiJIUzI1NiJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXByb2plY3RzTGVhZGVkIjoie30iLCJ4LWhhc3VyYS1naXRodWJVc2VySWQiOiI0MzQ2NzI0NiIsIngtaGFzdXJhLWdpdGh1YkFjY2Vzc1Rva2VuIjoiZ2hvX2lIYTY1dkJ6UlpTOGluY05Rd2xwa1VISUFZY0lJRTJ1N09abyIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsibWUiLCJwdWJsaWMiLCJyZWdpc3RlcmVkX3VzZXIiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoicmVnaXN0ZXJlZF91c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6IjliN2VmZmViLTk2M2YtNGFjNC1iZTc0LWQ3MzU1MDE5MjVlZCIsIngtaGFzdXJhLXVzZXItaXMtYW5vbnltb3VzIjoiZmFsc2UifSwic3ViIjoiOWI3ZWZmZWItOTYzZi00YWM0LWJlNzQtZDczNTUwMTkyNWVkIiwiaWF0IjoxNjkwNDU2NDIzLCJleHAiOjE2OTEwNjEyMjMsImlzcyI6Imhhc3VyYS1hdXRoLXVuaXQtdGVzdHMifQ.K29BlAJVzZgC3u_fjS-2mGOJsDwuYWoBfrBwPgqr5is";

		let project_id = "fa6eecb6-be2c-447f-9468-30c2defb2778";
		let request = json!({
			"project_id": project_id,
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
			.header(Header::new("Authorization", format!("Bearer {JWT}")))
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
