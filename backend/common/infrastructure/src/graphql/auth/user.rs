use async_trait::async_trait;
use domain::{
	AuthUser, AuthUserRepository, AuthUserRepositoryError, AuthUserRepositoryResult, UserId,
};
use graphql_client::GraphQLQuery;

use crate::graphql::{scalars::*, Client};

#[derive(GraphQLQuery)]
#[graphql(
	schema_path = "src/graphql/__generated/graphql.schema.json",
	query_path = "src/graphql/auth/queries.graphql",
	response_derives = "Debug"
)]
struct GetAuthUserById;

#[async_trait]
impl AuthUserRepository for Client {
	async fn user_by_id(&self, id: &UserId) -> AuthUserRepositoryResult<AuthUser> {
		let response = self
			.query::<GetAuthUserById>(get_auth_user_by_id::Variables { id: (*id).into() })
			.await?;

		Ok(response.user.ok_or(AuthUserRepositoryError::NotFound)?.into())
	}
}

impl From<get_auth_user_by_id::GetAuthUserByIdUser> for AuthUser {
	fn from(user: get_auth_user_by_id::GetAuthUserByIdUser) -> Self {
		Self::new(user.id.into(), user.display_name)
	}
}
