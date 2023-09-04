use anyhow::Result;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::GithubUser;
use event_listeners::models;
use infrastructure::database::schema::github_users;

use crate::context::github_indexer::Context;

#[allow(unused)]
pub fn anthony() -> GithubUser {
	GithubUser {
		id: 43467246u64.into(),
		login: String::from("AnthonyBuisset"),
		avatar_url: "https://avatars.githubusercontent.com/u/43467246?v=4".parse().unwrap(),
		html_url: "https://github.com/AnthonyBuisset".parse().unwrap(),
	}
}

#[allow(unused)]
pub fn stan() -> GithubUser {
	GithubUser {
		id: 4435377u64.into(),
		login: String::from("Bernardstanislas"),
		avatar_url: "https://avatars.githubusercontent.com/u/4435377?v=4".parse().unwrap(),
		html_url: "https://github.com/Bernardstanislas".parse().unwrap(),
	}
}

#[allow(unused)]
pub fn alex() -> GithubUser {
	GithubUser {
		id: 10922658u64.into(),
		login: String::from("alexbensimon"),
		avatar_url: "https://avatars.githubusercontent.com/u/10922658?v=4".parse().unwrap(),
		html_url: "https://github.com/alexbensimon".parse().unwrap(),
	}
}

#[allow(unused)]
pub fn od_develop() -> GithubUser {
	GithubUser {
		id: 136718082u64.into(),
		login: String::from("od-develop"),
		avatar_url: "https://avatars.githubusercontent.com/u/136718082?v=4".parse().unwrap(),
		html_url: "https://github.com/od-develop".parse().unwrap(),
	}
}

#[allow(unused)]
pub fn ofux() -> GithubUser {
	GithubUser {
		id: 595505u64.into(),
		login: String::from("ofux"),
		avatar_url: "https://avatars.githubusercontent.com/u/595505?v=4".parse().unwrap(),
		html_url: "https://github.com/ofux".parse().unwrap(),
	}
}

#[allow(unused)]
pub fn assert_is_indexed(context: &mut Context, expected_user: GithubUser) -> Result<()> {
	let mut connection = context.database.client.connection()?;

	let mut users: Vec<models::GithubUser> =
		github_users::table.order(github_users::id.desc()).load(&mut *connection)?;
	assert_eq!(users.len(), 1, "Invalid user count");
	{
		let user = users.pop().unwrap();
		assert_eq!(user.id, expected_user.id);
		assert_eq!(user.login, expected_user.login);
		assert_eq!(user.avatar_url, expected_user.avatar_url.to_string());
		assert_eq!(user.html_url, expected_user.html_url.to_string());
	}

	Ok(())
}
