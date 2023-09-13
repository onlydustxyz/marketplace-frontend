#[macro_use]
extern crate diesel;

use anyhow::Result;
use chrono::Utc;
use domain::{currencies, BudgetEvent, BudgetId, GithubRepoId, ProjectEvent, ProjectId, UserId};
use olog::info;
use rocket::http::{ContentType, Header, Status};
use rstest::rstest;
use rust_decimal::Decimal;
use serde_json::json;
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
		let budget_id = BudgetId::new();

		models::events::store(
			&self.context,
			vec![
				ProjectEvent::Created { id },
				ProjectEvent::BudgetLinked { id, budget_id },
				ProjectEvent::GithubRepoLinked { id, github_repo_id },
				ProjectEvent::LeaderAssigned {
					id,
					leader_id: UserId::new(),
					assigned_at: Utc::now().naive_utc(),
				},
			],
		)?;

		models::events::store(
			&self.context,
			vec![
				BudgetEvent::Created {
					id: budget_id,
					currency: currencies::USD,
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount: Decimal::from(10),
				},
			],
		)?;

		let request = json!({
			"projectId": id.to_string(),
			"githubRepoId": github_repo_id,
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
		let created_issue = response.into_json::<serde_json::Value>().await.unwrap();
		assert_eq!(
			created_issue,
			json!({
				"id": 1840630179,
				"repoId": 1111,
				"number": 25,
				"title": "issue-title",
				"author": {
				  "id": 16590657,
				  "login": "PierreOucif",
				  "avatarUrl": "https://avatars.githubusercontent.com/u/16590657?v=4",
				  "htmlUrl": "https://github.com/PierreOucif"
				},
				"htmlUrl": "https://github.com/onlydustxyz/od-rust-template/issues/25",
				"status": "COMPLETED",
				"createdAt": "2023-08-08T06:11:35Z",
				"updatedAt": "2023-08-08T06:13:08Z",
				"closedAt": "2023-08-08T06:13:08Z",
				"commentsCount": 0
			})
		);
		Ok(())
	}
}
