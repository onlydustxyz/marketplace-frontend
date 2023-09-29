use domain::{models::*, ports::output::github_api::*};

use crate::adapters::github_api::Client;

#[async_trait]
impl user::Port for Client {
	#[allow(clippy::all)]
	async fn user_by_id(&self, _user_id: u64) -> Result<User> {
		todo!()
	}
}
