use domain::GithubCommit;

use super::*;

#[allow(unused)]
pub fn a() -> GithubCommit {
	GithubCommit {
			sha: String::from("3e8b02526187e828f213864d16110d0982534809"),
			html_url: "https://github.com/onlydustxyz/marketplace/commit/3e8b02526187e828f213864d16110d0982534809".parse().unwrap(),
			author: users::anthony(),
		}
}

#[allow(unused)]
pub fn b() -> GithubCommit {
	GithubCommit {
			sha: String::from("32a353fdfb17b0b2e5328174309ecfa01e4780e5"),
			html_url: "https://github.com/onlydustxyz/marketplace/commit/32a353fdfb17b0b2e5328174309ecfa01e4780e5".parse().unwrap(),
			author: users::anthony(),
		}
}

#[allow(unused)]
pub fn c() -> GithubCommit {
	GithubCommit {
		sha: String::from("b83f75bf3d86cdf017c0f743dcf29dcffdb0ab97"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/b83f75bf3d86cdf017c0f743dcf29dcffdb0ab97".parse().unwrap(),
		author: users::alex(),
	}
}
