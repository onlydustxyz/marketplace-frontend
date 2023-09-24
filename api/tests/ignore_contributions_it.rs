#[macro_use]
extern crate diesel;

use anyhow::Result;
use api::models::IgnoredContribution;
use diesel::RunQueryDsl;
use domain::ProjectId;
use infrastructure::database::schema::ignored_contributions;
use olog::info;
use rocket::http::{Header, Status};
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::context::{
	docker,
	utils::{api_key_header, jwt},
	Context,
};

mod context;
mod models;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn ignore_contributions(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.project_lead_can_ignore_and_unignore_contribution()
		.await
		.expect("project_lead_can_ignore_and_unignore_contribution");

	test.anyone_cannot_ignore_and_unignore_contribution()
		.await
		.expect("anyone_cannot_ignore_and_unignore_contribution");

	test.missing_api_key().await.expect("missing_api_key");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn project_lead_can_ignore_and_unignore_contribution(&mut self) -> Result<()> {
		info!("project_lead_can_ignore_and_unignore_contribution");

		// Given
		let project_id = ProjectId::new();
		let contribution_id =
			String::from("00025534c677e0600a23e400562997f8f49ae8f67c396093ca15b43f08a3c73e");

		// When
		let response = self
			.context
			.http_client
			.post(format!(
				"/api/projects/{project_id}/contributions/{contribution_id}/ignore"
			))
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "registered_user"))
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(Some(project_id.to_string()))),
			))
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);

		let mut ignored_contributions: Vec<IgnoredContribution> =
			ignored_contributions::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(ignored_contributions.len(), 1);

		let ignored_contribution = ignored_contributions.pop().unwrap();
		assert_eq!(
			ignored_contribution,
			IgnoredContribution {
				project_id,
				contribution_id: contribution_id.clone()
			}
		);

		// When
		let response = self
			.context
			.http_client
			.delete(format!(
				"/api/projects/{project_id}/contributions/{contribution_id}/ignore"
			))
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
			"{:?}",
			response.into_string().await
		);

		let ignored_contributions: Vec<IgnoredContribution> =
			ignored_contributions::table.load(&mut *self.context.database.client.connection()?)?;

		assert!(ignored_contributions.is_empty());

		Ok(())
	}

	async fn anyone_cannot_ignore_and_unignore_contribution(&mut self) -> Result<()> {
		info!("anyone_cannot_ignore_and_unignore_contribution");

		// Given
		let project_id = ProjectId::new();
		let contribution_id =
			String::from("00025534c677e0600a23e400562997f8f49ae8f67c396093ca15b43f08a3c73e");

		// When
		let response = self
			.context
			.http_client
			.post(format!(
				"/api/projects/{project_id}/contributions/{contribution_id}/ignore"
			))
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "registered_user"))
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Unauthorized);

		// When
		let response = self
			.context
			.http_client
			.delete(format!(
				"/api/projects/{project_id}/contributions/{contribution_id}/ignore"
			))
			.header(api_key_header())
			.header(Header::new("x-hasura-role", "registered_user"))
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Unauthorized);

		Ok(())
	}

	async fn missing_api_key(&mut self) -> Result<()> {
		info!("missing_api_key");

		// Given
		let project_id = ProjectId::new();
		let contribution_id =
			String::from("00025534c677e0600a23e400562997f8f49ae8f67c396093ca15b43f08a3c73e");

		// When
		let response = self
			.context
			.http_client
			.post(format!(
				"/api/projects/{project_id}/contributions/{contribution_id}/ignore"
			))
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Unauthorized);

		// When
		let response = self
			.context
			.http_client
			.delete(format!(
				"/api/projects/{project_id}/contributions/{contribution_id}/ignore"
			))
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Unauthorized);

		Ok(())
	}
}
