use domain::GithubUser;
use octocrab::models::User;

pub trait UserFromOctocrab {
	fn from_octocrab_user(user: User) -> Self;
}

impl UserFromOctocrab for GithubUser {
	fn from_octocrab_user(user: User) -> Self {
		Self::new(user.id.0 as i32, user.login, user.avatar_url, user.html_url)
	}
}
