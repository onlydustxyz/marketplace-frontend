mod context;
mod models;

use std::collections::HashMap;

use anyhow::Result;
use api::presentation::http::routes::users;
use diesel::RunQueryDsl;
use domain::Languages;
use infrastructure::database::{
	enums::{AllocatedTime, ProfileCover},
	schema::user_profile_info,
};
use olog::info;
use rocket::{
	http::{ContentType, Header, Status},
	serde::json::json,
};
use rstest::rstest;
use testcontainers::clients::Cli;

use crate::{
	context::{
		docker,
		utils::{api_key_header, jwt},
		Context,
	},
	models::UserProfileInfo,
};

#[macro_use]
extern crate diesel;

#[rstest]
#[tokio::test(flavor = "multi_thread")]
pub async fn user_profile_updated(docker: &'static Cli) {
	let mut test = Test {
		context: Context::new(docker).await.expect("Unable to create test context"),
	};

	test.should_update_profile_info().await.expect("should_update_profile_info");
}

struct Test<'a> {
	context: Context<'a>,
}

impl<'a> Test<'a> {
	async fn should_update_profile_info(&mut self) -> Result<()> {
		info!("should_update_profile_info");

		// Given
		let request = json!({
			"bio": "My biography",
			"location": "France",
			"website": "https://onlydust.xyz",
			"languages": [
				{ "name": "Rust", "weight": 1 },
				{ "name": "Typescript", "weight": 0 }
			],
			"looking_for_a_job": true,
			"contact_informations": [
				{ "channel": "DISCORD", "contact": "Antho#1234", "public": true },
				{ "channel": "WHATSAPP", "contact": "+33612345678", "public": false }
			],
			"weekly_allocated_time": "LESS_THAN_ONE_DAY",
			"cover": "CYAN"
		});

		// When
		let response = self
			.context
			.http_client
			.post("/api/users/profile")
			.header(ContentType::JSON)
			.header(api_key_header())
			.header(Header::new(
				"Authorization",
				format!("Bearer {}", jwt(None)),
			))
			.body(request.to_string())
			.dispatch()
			.await;

		// Then
		assert_eq!(response.status(), Status::Ok);
		let response: users::update_profile::Response = response.into_json().await.unwrap();

		let user_id = response.user_id;

		let mut user_profiles: Vec<UserProfileInfo> =
			user_profile_info::table.load(&mut *self.context.database.client.connection()?)?;

		assert_eq!(user_profiles.len(), 1);

		let user_profile = user_profiles.pop().unwrap();
		assert_eq!(user_profile.id, user_id);
		assert_eq!(user_profile.bio.unwrap(), "My biography");
		assert_eq!(user_profile.location.unwrap(), "France");
		assert_eq!(user_profile.website.unwrap(), "https://onlydust.xyz");
		assert_eq!(
			user_profile.languages.unwrap().0,
			Languages::from(HashMap::from([
				(String::from("Rust"), 1),
				(String::from("Typescript"), 0)
			]))
		);
		assert_eq!(user_profile.weekly_allocated_time, AllocatedTime::Lt1day);
		assert_eq!(user_profile.avatar_url, None);
		assert_eq!(user_profile.cover.unwrap(), ProfileCover::Cyan);

		Ok(())
	}
}
