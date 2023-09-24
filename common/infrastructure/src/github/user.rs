use domain::GithubUser;
use octocrab::models::User;

pub trait UserFromOctocrab {
	fn from_octocrab_user(user: User) -> Self;
}

impl UserFromOctocrab for GithubUser {
	fn from_octocrab_user(user: User) -> Self {
		Self {
			id: (user.id.0 as i64).into(),
			login: user.login,
			avatar_url: user.avatar_url,
			html_url: user.html_url,
		}
	}
}
