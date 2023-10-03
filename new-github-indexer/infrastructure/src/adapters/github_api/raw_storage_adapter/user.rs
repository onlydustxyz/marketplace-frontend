use domain::{models::*, ports::output::raw_storage::*};

use crate::adapters::github_api::Client;

#[async_trait]
impl user::Port for Client {
	async fn user_by_id(&self, user_id: UserId) -> Result<User> {
		self.get_as(format!("/user/{user_id}")).await.map_err(Into::into)
	}

	async fn user_by_name(&self, username: String) -> Result<User> {
		self.get_as(format!("/users/{username}")).await.map_err(Into::into)
	}

	async fn user_social_accounts_by_id(&self, user_id: UserId) -> Result<Vec<SocialAccount>> {
		self.get_as(format!("/user/{user_id}/social_accounts"))
			.await
			.map_err(Into::into)
	}
}
