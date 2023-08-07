#[macro_use]
extern crate diesel;

use anyhow::Result;
use chrono::Utc;
use diesel::RunQueryDsl;
use rocket::http::{ContentType, Header, Status};
use rocket::serde::json::json;
use rstest::rstest;
use rust_decimal::Decimal;
use serde_json::to_value;
use testcontainers::clients::Cli;

use api::presentation::http::routes::issues::create_issue;
use domain::{BudgetEvent, BudgetId, GithubRepoId, ProjectEvent, ProjectId, UserId};
use infrastructure::{amqp::UniqueMessage, database::schema::events};
use olog::info;

use crate::{
	context::{Context, docker},
	models::Event as EventEntity,
};
use crate::context::utils::jwt;

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

		let project_created_event = ProjectEvent::Created { id: id.clone() };

		let project_budget_allocated_event = ProjectEvent::Budget {
			id: id.clone(),
			event: BudgetEvent::Allocated {
				id: BudgetId::new(),
				amount: Decimal::from(10),
			},
		};

		let project_github_repo_linked_event = ProjectEvent::GithubRepoLinked {
			id: id.clone(),
			github_repo_id: GithubRepoId::from(github_repo_id.clone()),
		};

		let project_leader_assigned_event = ProjectEvent::LeaderAssigned {
			id: id.clone(),
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
		let created_issue: create_issue::Response = response.into_json().await.unwrap();
		assert_eq!(created_issue.id, 12345);
		Ok(())
	}
}
