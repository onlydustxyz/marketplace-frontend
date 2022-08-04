mod projects;
use projects::{add_all_projects, list_all_projects};

mod fixtures;
use fixtures::*;

use rstest::*;

use assert_json_diff::assert_json_include;
use diesel::{Connection, PgConnection};
use dotenv::dotenv;
use rocket::{self, Build, Rocket};
use tokio::fs::read_to_string;

fn cleanup() {
	dotenv().ok();

	let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
	let connection = PgConnection::establish(&database_url)
		.expect(&format!("Error connecting to {}", database_url));

	loop {
		if diesel_migrations::revert_latest_migration(&connection).is_err() {
			break;
		}
	}

	diesel_migrations::run_pending_migrations(&connection).unwrap();
}

#[rstest]
#[tokio::test]
async fn e2e_test(rocket_handler: Rocket<Build>) {
	cleanup();

	add_all_projects(&rocket_handler).await;

	let actual = list_all_projects(&rocket_handler).await;
	let expected = read_to_string(String::from("src/tests/data/projects.json")).await.unwrap();

	let actual: serde_json::Value = serde_json::from_str(&actual).unwrap();
	let expected: serde_json::Value = serde_json::from_str(&expected).unwrap();

	assert_json_include!(actual: actual, expected: expected);
}
