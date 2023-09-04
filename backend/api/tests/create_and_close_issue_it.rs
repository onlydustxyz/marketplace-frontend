#[macro_use]
extern crate diesel;

use anyhow::Result;
use chrono::Utc;
use domain::{BudgetEvent, BudgetId, GithubRepoId, ProjectEvent, ProjectId, UserId};
use olog::info;
use rocket::{
	http::{ContentType, Header, Status},
	serde::json::json,
};
use rstest::rstest;
use rust_decimal::Decimal;
use testcontainers::clients::Cli;

use crate::context::{
	docker,
	utils::{api_key_header, jwt},
	Context,
};

mod context;
mod models;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn create_and_close_issue(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_create_and_close_issue()
		.await
		.expect("should_create_and_close_issue");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_create_and_close_issue(&mut self) -> Result<()> {
		info!("should_create_and_close_issue");

		// Given
		let id = ProjectId::new();
		let github_repo_id = GithubRepoId::from(1111u64);

		models::events::store(
			&self.context,
			vec![
				ProjectEvent::Created { id },
				ProjectEvent::Budget {
					id,
					event: BudgetEvent::Allocated {
						id: BudgetId::new(),
						amount: Decimal::from(10),
					},
				},
				ProjectEvent::GithubRepoLinked { id, github_repo_id },
				ProjectEvent::LeaderAssigned {
					id,
					leader_id: UserId::new(),
					assigned_at: Utc::now().naive_utc(),
				},
			],
		)?;

		let request = json!({
			"project_id": id.to_string(),
			"github_repo_id": github_repo_id,
			"title": "issue-title",
			"description": "issue-description",
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/issues")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "registered_user"))
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(Some(id.to_string()))),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let created_issue = response.into_string().await.unwrap();
		assert_eq!(
			created_issue,
			"{\"id\":1840630179,\"repo_id\":1111,\"number\":25,\"title\":\"issue-title\",\"author\":{\"id\":16590657,\"login\":\"PierreOucif\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/16590657?v=4\",\"html_url\":\"https://github.com/PierreOucif\"},\"html_url\":\"https://github.com/onlydustxyz/od-rust-template/issues/25\",\"status\":\"COMPLETED\",\"created_at\":\"2023-08-08T06:11:35Z\",\"updated_at\":\"2023-08-08T06:13:08Z\",\"closed_at\":\"2023-08-08T06:13:08Z\",\"comments_count\":0}"
		);
		Ok(())
	}
}
