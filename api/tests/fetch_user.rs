#[macro_use]
extern crate diesel;

use anyhow::Result;
use olog::info;
use rocket::http::{Header, Status};
use rstest::rstest;
use serde_json::json;
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
pub async fn fetch_user(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_search_users_given_a_query_without_parameters_and_pat()
		.await
		.expect("should_search_users_given_a_query_without_parameters_and_pat");
	test.should_search_users_given_a_query_with_parameters_and_pat()
		.await
		.expect("should_search_users_given_a_query_with_parameters_and_pat");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_search_users_given_a_query_without_parameters_and_pat(&mut self) -> Result<()> {
		info!("should_search_users_given_a_query_without_parameters_and_pat");
		// Given
		let resource = "/api/users/search?query=Pierre";

		// When
		let response = self
			.context
			.http_client
			.get(resource.to_string())
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let user_details: serde_json::Value = response.into_json().await.unwrap();
		assert_eq!(
			user_details,
			json!([
				{
				  "id": 51940,
				  "login": "pierre",
				  "avatarUrl": "https://avatars.githubusercontent.com/u/51940?v=4",
				  "htmlUrl": "https://github.com/pierre"
				},
				{
				  "id": 8023543,
				  "login": "turbo",
				  "avatarUrl": "https://avatars.githubusercontent.com/u/8023543?v=4",
				  "htmlUrl": "https://github.com/turbo"
				}
			])
		);
		Ok(())
	}

	async fn should_search_users_given_a_query_with_parameters_and_pat(&mut self) -> Result<()> {
		info!("should_search_users_given_a_query_without_parameters_and_pat");
		// Given
		let resource =
			"/api/users/search?query=Anthony&per_page=2&page=0&sort=repositories&order=asc";

		// When
		let response = self
			.context
			.http_client
			.get(resource.to_string())
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let user_details: serde_json::Value = response.into_json().await.unwrap();
		assert_eq!(
			user_details,
			json!([
				{
				  "id": 10130,
				  "login": "anthony",
				  "avatarUrl": "https://avatars.githubusercontent.com/u/10130?v=4",
				  "htmlUrl": "https://github.com/anthony"
				},
				{
				  "id": 3982077,
				  "login": "anthonychu",
				  "avatarUrl": "https://avatars.githubusercontent.com/u/3982077?v=4",
				  "htmlUrl": "https://github.com/anthonychu"
				}
			])
		);
		Ok(())
	}
}
