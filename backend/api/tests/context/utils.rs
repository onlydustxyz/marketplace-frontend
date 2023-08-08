use std::time::{SystemTime, UNIX_EPOCH};

use jsonwebtoken::EncodingKey;
use rocket::serde::json::json;

#[allow(unused)]
pub fn jwt(project_leaded_id: Option<String>) -> String {
	let now = SystemTime::now()
		.duration_since(UNIX_EPOCH)
		.expect("Time went backwards")
		.as_secs();
	let project_leaded = project_leaded_id
		.map(|id| format!("{{ \"{:}\" }}", id))
		.unwrap_or_else(|| "{}".to_string());
	jsonwebtoken::encode(
		&Default::default(),
		&json!({
		  "https://hasura.io/jwt/claims": {
			"x-hasura-projectsLeaded": project_leaded,
			"x-hasura-githubUserId": "43467246",
			"x-hasura-githubAccessToken": "",
			"x-hasura-allowed-roles": [
			  "me",
			  "public",
			  "registered_user"
			],
			"x-hasura-default-role": "registered_user",
			"x-hasura-user-id": "9b7effeb-963f-4ac4-be74-d735501925ed",
			"x-hasura-user-is-anonymous": "false"
		  },
		  "sub": "9b7effeb-963f-4ac4-be74-d735501925ed",
		  "iat": now,
		  "exp": now + 1000,
		  "iss": "hasura-auth-unit-tests"
		}),
		&EncodingKey::from_secret("secret".as_ref()),
	)
	.expect("Invalid JWT")
}
