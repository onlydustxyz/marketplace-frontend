use domain::GithubRepo;

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
	}
}
