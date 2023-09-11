mod context;
mod models;

use anyhow::Result;
use assert_matches::assert_matches;
use domain::{BudgetEvent, BudgetId, Currency, Event, ProjectEvent, ProjectId};
use olog::info;
use rocket::{
	http::{ContentType, Status},
	serde::json::json,
};
use rstest::rstest;
use rust_decimal_macros::dec;
use testcontainers::clients::Cli;

use crate::context::{docker, utils::api_key_header, Context};

#[macro_use]
extern crate diesel;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn budget_allocation(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_create_a_budget_upon_allocation()
		.await
		.expect("should_create_a_budget_upon_allocation");

	test.should_not_recreate_the_budget_upon_reallocation()
		.await
		.expect("should_not_recreate_the_budget_upon_reallocation");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_create_a_budget_upon_allocation(&mut self) -> Result<()> {
		info!("should_create_a_budget_upon_allocation");

		// Given
		let project_id = ProjectId::new();

		models::events::store(
			&self.context,
			vec![ProjectEvent::Created { id: project_id }],
		)?;

		let request = json!({
			"newRemainingAmountInUsd": 1523,
		});

		// When
		let response = self
			.context
			.http_client
			.put(format!("/api/projects/{project_id}/budgets"))
			.header(ContentType::JSON)
			.header(api_key_header())
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::Ok,
			"{}",
			response.into_string().await.unwrap()
		);

		let budget_id: BudgetId;

		assert_matches!(self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
			Event::Project(event) => {
				assert_matches!(event, ProjectEvent::Budget {
					id,
					event
				} => {
					assert_eq!(id, project_id);
					assert_matches!(event, BudgetEvent::Created {
						id,
						currency
					} => {
						budget_id = id;
						assert_eq!(currency, Currency::Crypto("USDC".to_string()));
				});
			});
		});

		assert_matches!(self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
			Event::Project(event) => {
				assert_matches!(event, ProjectEvent::Budget {
					id,
					event
				} => {
					assert_eq!(id, project_id);
					assert_matches!(event, BudgetEvent::Allocated {
						id,
						amount
					} => {
						assert_eq!(budget_id,id);
						assert_eq!(amount, dec!(1523));
				});
			});
		});

		Ok(())
	}

	async fn should_not_recreate_the_budget_upon_reallocation(&mut self) -> Result<()> {
		info!("should_not_recreate_the_budget_upon_reallocation");

		// Given
		let project_id = ProjectId::new();
		let budget_id = BudgetId::new();

		models::events::store(
			&self.context,
			vec![
				ProjectEvent::Created { id: project_id },
				ProjectEvent::Budget {
					id: project_id,
					event: BudgetEvent::Created {
						id: budget_id,
						currency: Currency::Crypto("USDC".to_string()),
					},
				},
				ProjectEvent::Budget {
					id: project_id,
					event: BudgetEvent::Allocated {
						id: budget_id,
						amount: dec!(1_000),
					},
				},
			],
		)?;

		let request = json!({
			"newRemainingAmountInUsd": 1523,
		});

		// When
		let response = self
			.context
			.http_client
			.put(format!("/api/projects/{project_id}/budgets"))
			.header(ContentType::JSON)
			.header(api_key_header())
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::Ok,
			"{}",
			response.into_string().await.unwrap()
		);

		assert_matches!(self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
			Event::Project(event) => {
				assert_matches!(event, ProjectEvent::Budget {
					id,
					event
				} => {
					assert_eq!(id, project_id);
					assert_matches!(event, BudgetEvent::Allocated {
						id,
						amount
					} => {
						assert_eq!(budget_id,id);
						assert_eq!(amount, dec!(523));
				});
			});
		});

		Ok(())
	}
}
