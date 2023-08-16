mod context;
mod models;

use anyhow::Result;
use api::presentation::http::routes::projects;
use diesel::RunQueryDsl;
use domain::Event;
use infrastructure::database::schema::project_details;
use olog::info;
use rocket::{
	http::{ContentType, Status},
	serde::json::json,
};
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::{
	context::{docker, Context},
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
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_create_the_project(&mut self) -> Result<()> {
		info!("should_create_the_project");

		let create_project_request = json!({
			"name": "My Awesome Project",
			"short_description": "A short description",
			"long_description": "A very looong description",
			"telegram_link": "http://telegram-link.test",
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/projects")
			.header(ContentType::JSON)
			.body(create_project_request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let project: projects::create_project::Response = response.into_json().await.unwrap();

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
}
