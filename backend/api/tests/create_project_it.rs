mod context;
mod models;

use anyhow::Result;
use api::presentation::http::routes::projects;
use assert_matches::assert_matches;
use diesel::RunQueryDsl;
use domain::{currencies, BudgetEvent, BudgetId, Event, ProjectEvent};
use infrastructure::database::schema::project_details;
use olog::info;
use rocket::{
	http::{ContentType, Status},
	serde::json::json,
};
use rstest::rstest;
use rust_decimal_macros::dec;
use testcontainers::clients::Cli;

use crate::{
	context::{docker, utils::api_key_header, Context},
	models::ProjectDetails,
};

#[macro_use]
extern crate diesel;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn new_project_added_on_the_platform(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_create_the_project().await.expect("should_create_the_project");

	test.should_create_a_project_with_initial_budget()
		.await
		.expect("should_create_a_project_with_initial_budget");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_create_the_project(&mut self) -> Result<()> {
		info!("should_create_the_project");

		let create_project_request = json!({
			"name": "My Awesome Project",
			"shortDescription": "A short description",
			"longDescription": "A very looong description",
			"telegramLink": "http://telegram-link.test",
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/projects")
			.header(ContentType::JSON)
			.header(api_key_header())
			.body(create_project_request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let project: projects::create::Response = response.into_json().await.unwrap();

		let project_id = project.project_id;

		assert_eq!(
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await,
			Some(Event::Project(domain::ProjectEvent::Created {
				id: project_id
			}))
		);

		let mut project_details: Vec<ProjectDetails> =
			project_details::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(project_details.len(), 1);

		let project_details = project_details.pop().unwrap();
		assert_eq!(
			project_details,
			ProjectDetails {
				project_id,
				name: "My Awesome Project".to_string(),
				key: "my-awesome-project".to_string(),
				short_description: "A short description".to_string(),
				long_description: "A very looong description".to_string(),
				telegram_link: Some("http://telegram-link.test/".to_string()),
				logo_url: None,
				hiring: false,
				rank: 0,
				visibility: infrastructure::database::enums::ProjectVisibility::Public
			}
		);

		Ok(())
	}

	async fn should_create_a_project_with_initial_budget(&mut self) -> Result<()> {
		info!("should_create_a_project_with_initial_budget");

		let create_project_request = json!({
			"name": "Another Awesome Project",
			"shortDescription": "A short description",
			"longDescription": "A very looong description",
			"telegramLink": "http://telegram-link.test",
			"initialBudget": {
				"amount": "1000",
				"currency": "USD"
			}
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/projects")
			.header(ContentType::JSON)
			.header(api_key_header())
			.body(create_project_request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let project: projects::create::Response = response.into_json().await.unwrap();

		let project_id = project.project_id;

		assert_eq!(
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await,
			Some(Event::Project(ProjectEvent::Created { id: project_id }))
		);

		let budget_id: BudgetId;

		assert_matches!(
		self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
		Event::Project(event) => {
			assert_matches!(event, ProjectEvent::BudgetLinked { budget_id: budget_id_, id, currency} => {
				budget_id = budget_id_;
				assert_eq!(id, project_id);
				assert_eq!(currency, currencies::USD);
			});
		});

		assert_eq!(
			Event::Budget(BudgetEvent::Created {
				id: budget_id,
				currency: currencies::USD
			}),
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
		);

		assert_eq!(
			Event::Budget(BudgetEvent::Allocated {
				id: budget_id,
				amount: dec!(1000)
			}),
			self.context.amqp.listen(event_store::bus::QUEUE_NAME).await.unwrap(),
		);

		Ok(())
	}
}
