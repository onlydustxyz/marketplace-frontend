#![allow(unused)]

use anyhow::Result;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::GithubUser;
use github_indexer::models;
use infrastructure::database::schema::github_users;

use crate::context::Context;

pub fn anthony() -> GithubUser {
	GithubUser {
		id: 43467246u64.into(),
		login: String::from("AnthonyBuisset"),
		avatar_url: "https://avatars.githubusercontent.com/u/43467246?v=4".parse().unwrap(),
		html_url: "https://github.com/AnthonyBuisset".parse().unwrap(),
	}
}

pub fn stan() -> GithubUser {
	GithubUser {
		id: 4435377u64.into(),
		login: String::from("Bernardstanislas"),
		avatar_url: "https://avatars.githubusercontent.com/u/4435377?v=4".parse().unwrap(),
		html_url: "https://github.com/Bernardstanislas".parse().unwrap(),
	}
}

pub fn alex() -> GithubUser {
	GithubUser {
		id: 10922658u64.into(),
		login: String::from("alexbensimon"),
		avatar_url: "https://avatars.githubusercontent.com/u/10922658?v=4".parse().unwrap(),
		html_url: "https://github.com/alexbensimon".parse().unwrap(),
	}
}

pub fn od_develop() -> GithubUser {
	GithubUser {
		id: 136718082u64.into(),
		login: String::from("od-develop"),
		avatar_url: "https://avatars.githubusercontent.com/u/136718082?v=4".parse().unwrap(),
		html_url: "https://github.com/od-develop".parse().unwrap(),
	}
}

pub fn ofux() -> GithubUser {
	GithubUser {
		id: 595505u64.into(),
		login: String::from("ofux"),
		avatar_url: "https://avatars.githubusercontent.com/u/595505?v=4".parse().unwrap(),
		html_url: "https://github.com/ofux".parse().unwrap(),
	}
}

#[track_caller]
pub fn assert_eq(user: models::GithubUser, expected: GithubUser) {
	assert_eq!(user.id, expected.id);
	assert_eq!(user.login, expected.login);
	assert_eq!(user.avatar_url, expected.avatar_url.to_string());
	assert_eq!(user.html_url, expected.html_url.to_string());
}

#[track_caller]
pub fn assert_indexed(context: &mut Context, expected: Vec<GithubUser>) -> Result<()> {
	let mut connection = context.database.client.connection()?;

	let mut users: Vec<models::GithubUser> =
		github_users::table.order(github_users::login.asc()).load(&mut *connection)?;

	assert_eq!(users.len(), expected.len(), "Invalid user count");

	for (user, expected) in users.into_iter().zip(expected) {
		assert_eq(user, expected);
	}

	Ok(())
}
