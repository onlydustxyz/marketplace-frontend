mod context;
mod models;

use anyhow::Result;
use assert_matches::assert_matches;
use domain::{currencies, sponsor, BudgetEvent, BudgetId, Event, ProjectEvent, ProjectId};
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

	test.should_allow_multiple_currencies()
		.await
		.expect("should_allow_multiple_currencies");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_create_a_budget_upon_allocation(&mut self) -> Result<()> {
		info!("should_create_a_budget_upon_allocation");

		// Given
		let project_id = ProjectId::new();
		let sponsor_id = sponsor::Id::new();

		models::events::store(
			&self.context,
			vec![ProjectEvent::Created { id: project_id }],
		)?;

		let request = json!({
			"amount": 1523,
			"currency": "USD",
			"sponsor": sponsor_id
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
			Event::Budget(event) => {
				assert_matches!(event, BudgetEvent::Created {
					id,
					currency
				} => {
					budget_id = id;
					assert_eq!(currency, currencies::USD);
			});
		});

		assert_eq!(
			Event::Project(ProjectEvent::BudgetLinked {
				id: project_id,
				budget_id,
				currency: currencies::USD
			}),
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
		);

		assert_eq!(
			Event::Budget(BudgetEvent::Allocated {
				id: budget_id,
				amount: dec!(1523),
				sponsor_id: Some(sponsor_id)
			}),
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
		);

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
				ProjectEvent::BudgetLinked {
					id: project_id,
					budget_id,
					currency: currencies::USD,
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
					amount: dec!(1_000),
					sponsor_id: None,
				},
			],
		)?;

		let request = json!({
			"amount":523,
			"currency": "USD"
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

		assert_eq!(
			Event::Budget(BudgetEvent::Allocated {
				id: budget_id,
				amount: dec!(523),
				sponsor_id: None
			}),
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
		);

		Ok(())
	}

	async fn should_allow_multiple_currencies(&mut self) -> Result<()> {
		info!("should_allow_multiple_currencies");

		// Given
		let project_id = ProjectId::new();
		let usd_budget_id = BudgetId::new();

		models::events::store(
			&self.context,
			vec![
				ProjectEvent::Created { id: project_id },
				ProjectEvent::BudgetLinked {
					id: project_id,
					budget_id: usd_budget_id,
					currency: currencies::USD,
				},
			],
		)?;

		models::events::store(
			&self.context,
			vec![
				BudgetEvent::Created {
					id: usd_budget_id,
					currency: currencies::USD,
				},
				BudgetEvent::Allocated {
					id: usd_budget_id,
					amount: dec!(1_000),
					sponsor_id: None,
				},
			],
		)?;

		let request = json!({
			"amount": 1,
			"currency": "ETH"
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

		let eth_budget_id: BudgetId;

		assert_matches!(self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
			Event::Budget(event) => {
				assert_matches!(event, BudgetEvent::Created {
					id,
					currency
				} => {
					eth_budget_id = id;
					assert_eq!(currency, currencies::ETH);
			});
		});

		assert_eq!(
			Event::Project(ProjectEvent::BudgetLinked {
				id: project_id,
				budget_id: eth_budget_id,
				currency: currencies::ETH
			}),
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
		);

		assert_eq!(
			Event::Budget(BudgetEvent::Allocated {
				id: eth_budget_id,
				amount: dec!(1),
				sponsor_id: None
			}),
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
		);

		Ok(())
	}
}
