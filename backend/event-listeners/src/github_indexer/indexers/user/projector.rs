use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFullUser, GithubUserId};
use infrastructure::database::Repository;

use super::{super::error::Result, Projector};
use crate::models::GithubUser;

#[derive(new)]
pub struct UserProjector {
	github_users_repository: Arc<dyn Repository<GithubUser>>,
}

#[async_trait]
impl Projector<GithubUserId, Option<GithubFullUser>> for UserProjector {
	async fn perform_projections(
		&self,
		_user_id: &GithubUserId,
		data: Option<GithubFullUser>,
	) -> Result<()> {
		if let Some(user) = data {
			self.github_users_repository.upsert(user.into())?;
		}
		Ok(())
	}
}

impl From<domain::GithubUser> for GithubUser {
	fn from(user: domain::GithubUser) -> Self {
		Self {
			id: user.id,
			login: user.login,
			avatar_url: user.avatar_url.to_string(),
			html_url: user.html_url.to_string(),
			..Default::default()
		}
	}
}

impl From<domain::GithubFullUser> for GithubUser {
	fn from(user: domain::GithubFullUser) -> Self {
		Self {
			id: user.id,
			login: user.login.clone(),
			avatar_url: user.avatar_url.to_string(),
			html_url: user.html_url.to_string(),
			bio: user.bio.clone(),
			location: user.location.clone(),
			website: user.blog.as_ref().map(|url| url.to_string()),
			twitter: user.get_social_account_url("twitter"),
			linkedin: user.get_social_account_url("linkedin"),
			telegram: user
				.social_accounts
				.iter()
				.find(|social_account| {
					social_account.url.starts_with("https://t.me")
						|| social_account.url.starts_with("https://telegram.me")
				})
				.map(|social_account| social_account.url.clone()),
		}
	}
}
