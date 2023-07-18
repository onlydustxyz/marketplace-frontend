mod fixtures;

use anyhow::{anyhow, Result};
use api::presentation::http::routes::projects;
use domain::Event;
use rocket::{
	http::{ContentType, Status},
	serde::json::json,
};
use rstest::rstest;

use crate::fixtures::{event_listener::listen_events, setup, Setup};

#[rstest]
#[tokio::test]
pub async fn should_create_project(#[future] setup: Setup) -> Result<()> {
	let setup = setup.await;
	let client = setup.client;
	let mut event_listener = listen_events(setup.config.amqp.clone()).await;

	let create_project_request = json!({
		"name": "name-test",
		"short_description": "short-description-name",
		"long_description": "long-description-name",
		"telegram_link": "http://telegram-link.test",
	});

	// When
	let response = client
		.post("/api/projects")
		.header(ContentType::JSON)
		.body(create_project_request.to_string())
		.dispatch()
		.await;

	// Then
	assert_eq!(response.status(), Status::Ok);
	let project: projects::create::Response =
		response.into_json().await.ok_or(anyhow!("Invalid JSON"))?;

	let project_id = project.project_id;

	assert_eq!(
		event_listener.recv().await,
		Some(Event::Project(domain::ProjectEvent::Created {
			id: project_id
		}))
	);

	Ok(())
}
