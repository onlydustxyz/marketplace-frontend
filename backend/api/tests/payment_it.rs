mod context;
mod models;

use std::str::FromStr;

use anyhow::Result;
use api::presentation::http::routes::payment;
use assert_matches::assert_matches;
use chrono::{Duration, Utc};
use domain::{
	currencies, Amount, Budget, BudgetEvent, BudgetId, Event, GithubPullRequestId,
	GithubPullRequestNumber, GithubRepoId, GithubUserId, Payment, PaymentEvent, PaymentId,
	PaymentReason, PaymentWorkItem, Project, ProjectEvent, ProjectId, UserId,
};
use olog::info;
use rocket::{
	http::{ContentType, Header, Status},
	serde::json::json,
};
use rstest::rstest;
use rust_decimal::Decimal;
use rust_decimal_macros::dec;
use testcontainers::clients::Cli;
use uuid::Uuid;

use crate::context::{
	docker,
	utils::{api_key_header, jwt},
	Context,
};

#[macro_use]
extern crate diesel;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn payment_processing(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.project_lead_can_request_payments()
		.await
		.expect("project_lead_can_request_payments");
	test.project_lead_can_request_payments_in_eth()
		.await
		.expect("project_lead_can_request_payments_in_eth");
	test.indexing_can_block_payment().await.expect("indexing_can_block_payment");
	test.anyone_cannot_request_payments()
		.await
		.expect("anyone_cannot_request_payments");
	test.project_lead_can_cancel_payments()
		.await
		.expect("project_lead_can_cancel_payments");
	test.admin_can_cancel_payments().await.expect("admin_can_cancel_payments");
	test.anyone_cannot_cancel_payments()
		.await
		.expect("anyone_cannot_cancel_payments");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn project_lead_can_request_payments(&mut self) -> Result<()> {
		info!("project_lead_can_request_payments");

		// Given
		let project_id = ProjectId::new();
		let budget_id = BudgetId::new();
		let before = Utc::now().naive_utc();

		models::events::store::<Project>(
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

		models::events::store::<Budget>(
			&self.context,
			vec![
				BudgetEvent::Created {
					id: budget_id,
					currency: currencies::USD,
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount: Decimal::from(1_000),
					sponsor_id: None,
				},
			],
		)?;

		let request = json!({
			"projectId": project_id,
			"recipientId": 595505,
			"amount": 10,
			"currency": "USD",
			"hoursWorked": 1,
			"reason": {
				"workItems": [{
					"type": "PULL_REQUEST",
					"id": "1012167246",
					"repoId": 498695724,
					"number": 111
				}
			]}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/payments")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "registered_user"))
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(Some(project_id.to_string()))),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::Ok,
			"{}",
			response.into_string().await.unwrap_or_default()
		);
		let response: payment::request::Response = response.into_json().await.unwrap();

		let payment_id: PaymentId = response.payment_id;

		let after = Utc::now().naive_utc();

		assert_eq!(
			Event::Budget(BudgetEvent::Spent {
				id: budget_id,
				amount: dec!(10)
			}),
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
		);

		assert_matches!(
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
			Event::Payment(event) => {
				assert_matches!(event, PaymentEvent::Requested {
					id,
					project_id: project_id_,
					requestor_id,
					recipient_id,
					amount,
					duration_worked,
					reason,
					requested_at
				} => {
					assert_eq!(id, payment_id);
					assert_eq!(project_id_, project_id);
					assert_eq!(requestor_id, Uuid::from_str("9b7effeb-963f-4ac4-be74-d735501925ed").unwrap().into());
					assert_eq!(recipient_id,  GithubUserId::from(595505u64));
					assert_eq!(amount, Amount::from_decimal(
						Decimal::from(10),
						currencies::USD
					));
					assert_eq!(duration_worked, Duration::hours(1));
					assert_eq!(reason, PaymentReason {
						work_items: vec![PaymentWorkItem::PullRequest {
							id: GithubPullRequestId::from(1012167246u64),
							repo_id: GithubRepoId::from(498695724u64),
							number: GithubPullRequestNumber::from(111u64)
						}]
					});

					assert!(requested_at > before);
					assert!(requested_at < after);
				});
			}
		);

		Ok(())
	}

	async fn project_lead_can_request_payments_in_eth(&mut self) -> Result<()> {
		info!("project_lead_can_request_payments_in_eth");

		// Given
		let project_id = ProjectId::new();
		let budget_id = BudgetId::new();
		let before = Utc::now().naive_utc();

		models::events::store::<Project>(
			&self.context,
			vec![
				ProjectEvent::Created { id: project_id },
				ProjectEvent::BudgetLinked {
					id: project_id,
					budget_id,
					currency: currencies::ETH,
				},
			],
		)?;

		models::events::store::<Budget>(
			&self.context,
			vec![
				BudgetEvent::Created {
					id: budget_id,
					currency: currencies::ETH,
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount: Decimal::from(1),
					sponsor_id: None,
				},
			],
		)?;

		let request = json!({
			"projectId": project_id,
			"recipientId": 595505,
			"amount": 0.00001,
			"currency": "ETH",
			"hoursWorked": 1,
			"reason": {
				"workItems": [{
					"type": "PULL_REQUEST",
					"id": "1012167246",
					"repoId": 498695724,
					"number": 111
				}
			]}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/payments")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "registered_user"))
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(Some(project_id.to_string()))),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::Ok,
			"{}",
			response.into_string().await.unwrap_or_default()
		);
		let response: payment::request::Response = response.into_json().await.unwrap();

		let payment_id: PaymentId = response.payment_id;

		let after = Utc::now().naive_utc();

		assert_eq!(
			Event::Budget(BudgetEvent::Spent {
				id: budget_id,
				amount: dec!(0.00001)
			}),
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
		);

		assert_matches!(
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
			Event::Payment(event) => {
				assert_matches!(event, PaymentEvent::Requested {
					id,
					project_id: project_id_,
					requestor_id,
					recipient_id,
					amount,
					duration_worked,
					reason,
					requested_at
				} => {
					assert_eq!(id, payment_id);
					assert_eq!(project_id_, project_id);
					assert_eq!(requestor_id, Uuid::from_str("9b7effeb-963f-4ac4-be74-d735501925ed").unwrap().into());
					assert_eq!(recipient_id,  GithubUserId::from(595505u64));
					assert_eq!(amount, Amount::from_decimal(
						Decimal::from_str("0.00001").unwrap(),
						currencies::ETH
					));
					assert_eq!(duration_worked, Duration::hours(1));
					assert_eq!(reason, PaymentReason {
						work_items: vec![PaymentWorkItem::PullRequest {
							id: GithubPullRequestId::from(1012167246u64),
							repo_id: GithubRepoId::from(498695724u64),
							number: GithubPullRequestNumber::from(111u64)
						}]
					});

					assert!(requested_at > before);
					assert!(requested_at < after);
				});
			}
		);

		Ok(())
	}

	async fn indexing_can_block_payment(&mut self) -> Result<()> {
		info!("indexing_can_block_payment");

		// Given
		let project_id = ProjectId::new();
		let budget_id = BudgetId::new();

		models::events::store::<Project>(
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

		models::events::store::<Budget>(
			&self.context,
			vec![
				BudgetEvent::Created {
					id: budget_id,
					currency: currencies::USD,
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount: Decimal::from(1_000),
					sponsor_id: None,
				},
			],
		)?;

		let request = json!({
			"projectId": project_id,
			"recipientId": 595505,
			"amount": 10,
			"currency": "USD",
			"hoursWorked": 1,
			"reason": {
				"workItems": [{
					"type": "PULL_REQUEST",
					"id": "123456",
					"repoId": 498695724,
					"number": 111
				},{
					"type": "PULL_REQUEST",
					"id": "123456",
					"repoId": 1181927,
					"number": 111
				}]
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/payments")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "registered_user"))
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(Some(project_id.to_string()))),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::InternalServerError,
			"{}",
			response.into_string().await.unwrap_or_default()
		);

		Ok(())
	}

	async fn anyone_cannot_request_payments(&mut self) -> Result<()> {
		info!("anyone_cannot_request_payments");

		// Given
		let project_id = ProjectId::new();
		let budget_id = BudgetId::new();

		models::events::store::<Project>(
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

		models::events::store::<Budget>(
			&self.context,
			vec![
				BudgetEvent::Created {
					id: budget_id,
					currency: currencies::USD,
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount: Decimal::from(1_000),
					sponsor_id: None,
				},
			],
		)?;

		let request = json!({
			"projectId": project_id,
			"recipientId": 595505,
			"amount": 10,
			"currency": "USD",
			"hoursWorked": 1,
			"reason": {
				"workItems": [{
					"type": "PULL_REQUEST",
					"id": "1012167246",
					"repoId": 498695724,
					"number": 111
				}
			]}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/payments")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "registered_user"))
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::Unauthorized,
			"{}",
			response.into_string().await.unwrap_or_default()
		);

		Ok(())
	}

	async fn project_lead_can_cancel_payments(&mut self) -> Result<()> {
		info!("project_lead_can_cancel_payments");

		// Given
		let project_id = ProjectId::new();
		let budget_id = BudgetId::new();
		let payment_id = PaymentId::new();

		models::events::store::<Project>(
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

		models::events::store::<Budget>(
			&self.context,
			vec![
				BudgetEvent::Created {
					id: budget_id,
					currency: currencies::USD,
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount: Decimal::from(1_000),
					sponsor_id: None,
				},
			],
		)?;

		models::events::store::<Payment>(
			&self.context,
			vec![PaymentEvent::Requested {
				id: payment_id,
				project_id,
				requestor_id: UserId::new(),
				recipient_id: GithubUserId::from(595505u64),
				amount: Amount::from_decimal(Decimal::from(100), currencies::USD),
				duration_worked: Duration::hours(2),
				reason: PaymentReason { work_items: vec![] },
				requested_at: Utc::now().naive_utc(),
			}],
		)?;

		// When
		let response = self
			.context
			.http_client
			.delete(format!("/api/payments/{payment_id}"))
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "registered_user"))
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(Some(project_id.to_string()))),
			))
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::Ok,
			"{}",
			response.into_string().await.unwrap_or_default()
		);

		Ok(())
	}

	async fn admin_can_cancel_payments(&mut self) -> Result<()> {
		info!("admin_can_cancel_payments");

		// Given
		let project_id = ProjectId::new();
		let budget_id = BudgetId::new();
		let payment_id = PaymentId::new();

		models::events::store::<Project>(
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

		models::events::store::<Budget>(
			&self.context,
			vec![
				BudgetEvent::Created {
					id: budget_id,
					currency: currencies::USD,
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount: Decimal::from(1_000),
					sponsor_id: None,
				},
			],
		)?;

		models::events::store::<Payment>(
			&self.context,
			vec![PaymentEvent::Requested {
				id: payment_id,
				project_id,
				requestor_id: UserId::new(),
				recipient_id: GithubUserId::from(595505u64),
				amount: Amount::from_decimal(Decimal::from(100), currencies::USD),
				duration_worked: Duration::hours(2),
				reason: PaymentReason { work_items: vec![] },
				requested_at: Utc::now().naive_utc(),
			}],
		)?;

		// When
		let response = self
			.context
			.http_client
			.delete(format!("/api/payments/{payment_id}"))
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "admin"))
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::Ok,
			"{}",
			response.into_string().await.unwrap_or_default()
		);

		Ok(())
	}

	async fn anyone_cannot_cancel_payments(&mut self) -> Result<()> {
		info!("anyone_cannot_cancel_payments");

		// Given
		let project_id = ProjectId::new();
		let budget_id = BudgetId::new();
		let payment_id = PaymentId::new();

		models::events::store::<Project>(
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

		models::events::store::<Budget>(
			&self.context,
			vec![
				BudgetEvent::Created {
					id: budget_id,
					currency: currencies::USD,
				},
				BudgetEvent::Allocated {
					id: budget_id,
					amount: Decimal::from(1_000),
					sponsor_id: None,
				},
			],
		)?;

		models::events::store::<Payment>(
			&self.context,
			vec![PaymentEvent::Requested {
				id: payment_id,
				project_id,
				requestor_id: UserId::new(),
				recipient_id: GithubUserId::from(595505u64),
				amount: Amount::from_decimal(Decimal::from(100), currencies::USD),
				duration_worked: Duration::hours(2),
				reason: PaymentReason { work_items: vec![] },
				requested_at: Utc::now().naive_utc(),
			}],
		)?;

		// When
		let response = self
			.context
			.http_client
			.delete(format!("/api/payments/{payment_id}"))
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "registered_user"))
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.dispatch()
			.await;

		// Then
		assert_eq!(
			response.status(),
			Status::Unauthorized,
			"{}",
			response.into_string().await.unwrap_or_default()
		);

		Ok(())
	}
}
