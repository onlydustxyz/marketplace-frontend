mod context;

use anyhow::Result;
use api::presentation::http::routes::projects;
use diesel::RunQueryDsl;
use domain::{Event, ProjectId};
use infrastructure::database::{enums::ProjectVisibility, schema::project_details};
use olog::info;
use rocket::{
	http::{ContentType, Status},
	serde::json::json,
};
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::context::{docker, Context};

#[macro_use]
extern crate diesel;

#[derive(Debug, Clone, Queryable)]
#[diesel(table_name = project_details, primary_key(project_id))]
pub struct ProjectDetails {
	pub project_id: ProjectId,
	pub telegram_link: Option<String>,
	pub logo_url: Option<String>,
	pub name: String,
	pub short_description: String,
	pub long_description: String,
	pub hiring: bool,
	pub rank: i32,
	pub visibility: ProjectVisibility,
	pub key: String,
}

#[rstest]
#[tokio::test]
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
			"short_description": "short-description-name",
			"long_description": "long-description-name",
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
		let project: projects::create::Response = response.into_json().await.unwrap();

		let project_id = project.project_id;

		assert_eq!(
			self.context.amqp.listener.recv().await,
			Some(Event::Project(domain::ProjectEvent::Created {
				id: project_id
			}))
		);

		let mut project_details: Vec<ProjectDetails> =
			project_details::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(project_details.len(), 1);

		let project_details = project_details.pop().unwrap();
		assert_eq!(project_details.project_id, project_id);
		assert_eq!(project_details.name, "My Awesome Project");
		assert_eq!(project_details.key, "my-awesome-project");

		Ok(())
	}
}
