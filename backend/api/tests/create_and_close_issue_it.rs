#[macro_use]
extern crate diesel;

use anyhow::Result;
use chrono::Utc;
use diesel::RunQueryDsl;
use domain::{BudgetEvent, BudgetId, GithubRepoId, ProjectEvent, ProjectId, UserId};
use infrastructure::{amqp::UniqueMessage, database::schema::events};
use olog::info;
use rocket::{
	http::{ContentType, Header, Status},
	serde::json::json,
};
use rstest::rstest;
use rust_decimal::Decimal;
use serde_json::to_value;
use testcontainers::clients::Cli;

use crate::{
	context::{docker, utils::jwt, Context},
	models::Event as EventEntity,
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
		let github_repo_id: i64 = 1111;
		let request = json!({
			"project_id": id.to_string(),
			"github_repo_id": github_repo_id.clone(),
			"title": "issue-title",
			"description": "issue-description",
		});

		let project_created_event = ProjectEvent::Created { id };

		let project_budget_allocated_event = ProjectEvent::Budget {
			id,
			event: BudgetEvent::Allocated {
				id: BudgetId::new(),
				amount: Decimal::from(10),
			},
		};

		let project_github_repo_linked_event = ProjectEvent::GithubRepoLinked {
			id,
			github_repo_id: GithubRepoId::from(github_repo_id),
		};

		let project_leader_assigned_event = ProjectEvent::LeaderAssigned {
			id,
			leader_id: UserId::new(),
			assigned_at: Utc::now().naive_utc(),
		};

		let mut events_to_save: Vec<EventEntity> = Vec::new();
		for event in vec![
			project_created_event,
			project_budget_allocated_event,
			project_github_repo_linked_event,
			project_leader_assigned_event,
		] {
			let storable_event: UniqueMessage<ProjectEvent> = UniqueMessage::new(event);
			let domain_event = storable_event.payload().clone();
			let event_entity = EventEntity {
				timestamp: *storable_event.timestamp(),
				aggregate_name: "PROJECT".to_string(),
				aggregate_id: id.to_string(),
				payload: to_value(&domain_event)?,
				metadata: storable_event.metadata().clone(),
				command_id: storable_event.command_id().map(Into::into),
			};
			events_to_save.push(event_entity);
		}

		let _ = diesel::insert_into(events::table)
			.values(events_to_save)
			.execute(&mut *self.context.database.client.connection()?)?;

		// When
		let response = self
			.context
			.http_client
			.post("/api/issues")
			.header(ContentType::JSON)
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
			"{\"id\":1840630179,\"repo_id\":1111,\"number\":25,\"title\":\"issue-title\",\"author\":{\"id\":16590657,\"login\":\"PierreOucif\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/16590657?v=4\",\"html_url\":\"https://github.com/PierreOucif\"},\"html_url\":\"https://github.com/onlydustxyz/od-rust-template/issues/25\",\"status\":\"Open\",\"created_at\":\"2023-08-08T06:11:35Z\",\"updated_at\":\"2023-08-08T06:11:35Z\",\"closed_at\":null,\"comments_count\":0}"
		);
		Ok(())
	}
}
