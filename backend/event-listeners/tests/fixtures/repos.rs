use anyhow::Result;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use domain::GithubRepo;
use event_listeners::models;
use infrastructure::database::schema::github_repos;
use serde_json::json;

use crate::context::github_indexer::Context;

#[allow(unused)]
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

#[allow(unused)]
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

#[allow(unused)]
pub fn assert_is_indexed(context: &mut Context, expected_repo: GithubRepo) -> Result<()> {
	let mut connection = context.database.client.connection()?;

	let mut repos: Vec<models::GithubRepo> =
		github_repos::table.order(github_repos::id.desc()).load(&mut *connection)?;
	assert_eq!(repos.len(), 1, "Invalid repo count");
	{
		let repo = repos.pop().unwrap();
		assert_eq!(repo.id, expected_repo.id);
		assert_eq!(repo.owner, expected_repo.owner);
		assert_eq!(repo.name, expected_repo.name);
		assert_eq!(repo.html_url, expected_repo.html_url.to_string());
		assert_eq!(repo.description, expected_repo.description);
		assert_eq!(repo.fork_count, expected_repo.forks_count);
		assert_eq!(repo.stars, expected_repo.stars);
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
		assert_eq!(repo.parent_id, expected_repo.parent.map(|p| p.id));
		assert_eq!(repo.has_issues, expected_repo.has_issues);
	}

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
