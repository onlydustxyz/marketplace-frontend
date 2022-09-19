use crate::domain::{
	errors::{AuthenticationError, IdentificationError},
	value_objects::{AccessToken, Identity},
};
use async_trait::async_trait;

#[async_trait]
pub trait IdentityProvider: Send + Sync {
	async fn new_access_token(
		&self,
		authorization_code: &str,
	) -> Result<AccessToken, AuthenticationError>;

	async fn get_user_id(
		&self,
		access_token: &AccessToken,
	) -> Result<Identity, IdentificationError>;
}
