mod context;
mod models;

use std::str::FromStr;

use anyhow::Result;
use api::presentation::http::routes::payment;
use assert_matches::assert_matches;
use chrono::{Duration, Utc};
use domain::{
	Amount, BudgetEvent, BudgetId, Currency, Event, GithubIssueNumber, GithubRepoId, GithubUserId,
	PaymentEvent, PaymentId, PaymentReason, PaymentWorkItem, ProjectEvent, ProjectId,
};
use olog::info;
use rocket::{
	http::{ContentType, Header, Status},
	serde::json::json,
};
use rstest::rstest;
use rust_decimal::Decimal;
use testcontainers::clients::Cli;
use uuid::Uuid;

use crate::context::{docker, utils::jwt, Context};

#[macro_use]
extern crate diesel;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn payment_processing(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_request_payment().await.expect("should_request_payment");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_request_payment(&mut self) -> Result<()> {
		info!("should_request_payment");

		// Given
		let project_id = ProjectId::new();
		let budget_id = BudgetId::new();
		let before = Utc::now().naive_utc();

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
						amount: Decimal::from(1_000),
					},
				},
			],
		)?;

		let request = json!({
			"project_id": project_id,
			"recipient_id": 595505,
			"amount_in_usd": 10,
			"hours_worked": 1,
			"reason": {
				"work_items": [{
					"repo_id": 498695724,
					"issue_number": 111
				}
			]}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/payments")
			.header(ContentType::JSON)
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

		assert_eq!(response.project_id, project_id.into());
		assert_eq!(response.budget_id, budget_id.into());
		assert_eq!(response.amount, 10f64);

		let payment_id: PaymentId = response.payment_id.into();

		let after = Utc::now().naive_utc();

		assert_matches!(
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
			Event::Project(event) => {
				assert_matches!(event, ProjectEvent::Budget {
					id,
					event
				} => {
					assert_eq!(id, project_id);
					assert_matches!(event, BudgetEvent::Payment {
						id,
						event
					} => {
						assert_eq!(id, budget_id);
						assert_matches!(event, PaymentEvent::Requested {
							id,
							requestor_id,
							recipient_id,
							amount,
							duration_worked,
							reason,
							requested_at
						} => {
							assert_eq!(id, payment_id);
							assert_eq!(requestor_id, Uuid::from_str("9b7effeb-963f-4ac4-be74-d735501925ed").unwrap().into());
							assert_eq!(recipient_id,  GithubUserId::from(595505u64));
							assert_eq!(amount, Amount::new(
								Decimal::from(10),
								Currency::Crypto(String::from("USDC"))
							));
							assert_eq!(duration_worked, Duration::hours(1));
							assert_eq!(reason, PaymentReason {
								work_items: vec![PaymentWorkItem {
									repo_id: GithubRepoId::from(498695724u64),
									issue_number: GithubIssueNumber::from(111u64)
								}]
							});

							assert!(requested_at > before);
							assert!(requested_at < after);
						})
					}
					)
				});
			}
		);

		Ok(())
	}
}
