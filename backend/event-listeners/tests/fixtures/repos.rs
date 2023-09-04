#![allow(unused)]

use anyhow::Result;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::GithubRepo;
use event_listeners::models;
use infrastructure::database::schema::github_repos;
use serde_json::json;

use crate::context::github_indexer::Context;

pub fn marketplace() -> GithubRepo {
	GithubRepo {
		id: 498695724u64.into(),
		owner: String::from("onlydustxyz"),
		name: String::from("marketplace"),
		logo_url: "https://avatars.githubusercontent.com/u/98735558?v=4".parse().unwrap(),
		html_url: "https://github.com/onlydustxyz/marketplace".parse().unwrap(),
		description: String::from("Contributions marketplace backend services"),
		stars: 13,
		forks_count: 8,
		parent: None,
		has_issues: true,
	}
}

pub fn marketplace_fork() -> GithubRepo {
	GithubRepo {
		id: 676033192u64.into(),
		owner: String::from("onlydust-contributor"),
		name: String::from("marketplace"),
		logo_url: "https://avatars.githubusercontent.com/u/112474158?v=4".parse().unwrap(),
		html_url: "https://github.com/onlydust-contributor/marketplace".parse().unwrap(),
		description: String::from("Contributions marketplace backend services"),
		stars: 0,
		forks_count: 0,
		parent: Some(Box::new(marketplace())),
		has_issues: false,
	}
}

#[track_caller]
pub fn assert_eq(repo: models::GithubRepo, expected: GithubRepo) -> Result<()> {
	assert_eq!(repo.id, expected.id);
	assert_eq!(repo.owner, expected.owner);
	assert_eq!(repo.name, expected.name);
	assert_eq!(repo.html_url, expected.html_url.to_string());
	assert_eq!(repo.description, expected.description);
	assert_eq!(repo.fork_count, expected.forks_count);
	assert_eq!(repo.stars, expected.stars);
	assert_eq!(
		repo.languages,
		json!({
			"TypeScript": 2405007,
			"Rust": 574966,
			"PLpgSQL": 26212,
			"JavaScript": 23721,
			"Shell": 12794,
			"Makefile": 8658,
			"CSS": 4475,
			"HTML": 1539,
			"Procfile": 507,
			"Nix": 120
		})
	);
	assert_eq!(repo.parent_id, expected.parent.map(|p| p.id));
	assert_eq!(repo.has_issues, expected.has_issues);

	//TODO: test fork
	// {
	// 	let repo = repos.pop().unwrap();
	// 	assert_eq!(repo.id, repos::marketplace_fork().id);
	// 	assert_eq!(repo.owner, repos::marketplace_fork().owner);
	// 	assert_eq!(repo.name, repos::marketplace_fork().name);
	// 	assert_eq!(
	// 		repo.html_url,
	// 		repos::marketplace_fork().html_url.to_string()
	// 	);
	// 	assert_eq!(repo.description, repos::marketplace_fork().description);
	// 	assert_eq!(repo.fork_count, repos::marketplace_fork().forks_count);
	// 	assert_eq!(repo.stars, repos::marketplace_fork().stars);
	// 	assert_eq!(repo.languages, json!({}));
	// 	assert_eq!(repo.parent_id, Some(expected_repo.id));
	// 	assert_eq!(repo.has_issues, repos::marketplace_fork().has_issues);
	// }

	Ok(())
}

#[track_caller]
pub fn assert_indexed(context: &mut Context, expected: Vec<GithubRepo>) -> Result<()> {
	let mut connection = context.database.client.connection()?;

	let mut repos: Vec<models::GithubRepo> =
		github_repos::table.order(github_repos::id.asc()).load(&mut *connection)?;

	assert_eq!(repos.len(), expected.len(), "Invalid repo count");

	for (repo, expected) in repos.into_iter().zip(expected) {
		assert_eq(repo, expected);
	}

	Ok(())
}
