use domain::{models::*, ports::output::github_api::*};

use crate::adapters::github_api::Client;

#[async_trait]
impl social_accounts::Port for Client {
	async fn social_accounts_by_userid(&self, userid: UserId) -> Result<SocialAccounts> {
		self.get_as(format!("/user/{userid}/social_accounts")).await.map_err(Into::into)
	}

	async fn social_accounts_by_username(&self, username: String) -> Result<SocialAccounts> {
		self.get_as(format!("/users/{username}/social_accounts"))
			.await
			.map_err(Into::into)
	}
}
