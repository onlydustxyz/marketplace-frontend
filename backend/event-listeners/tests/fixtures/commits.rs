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
		sha: String::from("a60418a359dd50b36705ce2dfa5e1437e2d488c9"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/a60418a359dd50b36705ce2dfa5e1437e2d488c9".parse().unwrap(),
		author: users::ofux(),
	}
}

#[allow(unused)]
pub fn d() -> GithubCommit {
	GithubCommit {
		sha: String::from("b7fccc7458784d8fdc3434cfd6909ad0ed0075ab"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/b7fccc7458784d8fdc3434cfd6909ad0ed0075ab".parse().unwrap(),
		author: users::ofux(),
	}
}

#[allow(unused)]
pub fn e() -> GithubCommit {
	GithubCommit {
		sha: String::from("b84ff1f57e4d55d95adae8ac1d337d68d87f0eb1"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/b84ff1f57e4d55d95adae8ac1d337d68d87f0eb1".parse().unwrap(),
		author: users::ofux(),
	}
}

#[allow(unused)]
pub fn f() -> GithubCommit {
	GithubCommit {
		sha: String::from("10f3ec3765f0d8a8b03fa73b2eb37f7b82af8a2d"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/10f3ec3765f0d8a8b03fa73b2eb37f7b82af8a2d".parse().unwrap(),
		author: users::anthony(),
	}
}

#[allow(unused)]
pub fn g() -> GithubCommit {
	GithubCommit {
		sha: String::from("26bf483718f3ae262193bca39a2e283c0ad5d4ed"),
		html_url: "https://github.com/onlydustxyz/marketplace/commit/26bf483718f3ae262193bca39a2e283c0ad5d4ed".parse().unwrap(),
		author: users::ofux(),
	}
}

#[allow(unused)]
pub fn h() -> GithubCommit {
	GithubCommit {
			sha: String::from("28717122c963626883ce63db2a6dd7f2cbb5a7db"),
			html_url: "https://github.com/onlydustxyz/marketplace/commit/28717122c963626883ce63db2a6dd7f2cbb5a7db".parse().unwrap(),
			author: users::stan(),
		}
}
