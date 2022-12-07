use async_trait::async_trait;
use domain::*;
use graphql_client::GraphQLQuery;

use crate::graphql::HasuraClient;

use uuid::Uuid;

#[derive(GraphQLQuery)]
#[graphql(
	schema_path = "../hasura/schema/schema.graphql",
	query_path = "graphql/query_find_user.graphql",
	response_derives = "Debug",
	normalization = "rust"
)]
pub struct FindUserQuery;

#[async_trait]
impl UserRepository for HasuraClient {
	async fn find_by_id(&self, id: &UserId) -> Result<User, UserRepositoryError> {
		let response_data = self
			.0
			.query::<FindUserQuery>(find_user_query::Variables {
				user_id: (*id).into(),
			})
			.await
			.map_err(UserRepositoryError::Infrastructure)?;

		match response_data.user {
			Some(_) => Ok(domain::User::new(*id)),
			None => Err(UserRepositoryError::NotFound),
		}
	}
}

#[cfg(test)]
mod tests {

	use crate::graphql::Config;

	use super::*;
	use ::uuid::Uuid;
	use assert_matches::assert_matches;
	use httpmock::{Method::POST, MockServer};
	use rstest::{fixture, rstest};
	use serde_json::json;
	use std::str::FromStr;

	#[fixture]
	fn user_id() -> UserId {
		Uuid::from_str("aaaaaaaa-8ac2-478a-95f9-6853cd1c4593").unwrap().into()
	}

	#[fixture]
	fn unexisting_user_id() -> UserId {
		Uuid::from_str("00000000-8ac2-478a-95f9-6853cd1c4593").unwrap().into()
	}

	#[rstest]
	#[tokio::test]
	async fn test_find_by_id(user_id: UserId) {
		let server = MockServer::start();
		server.mock(|when, then| {
			when.method(POST).path("/v1/graphql").body_contains(user_id.to_string());
			then.status(200).json_body(json!({
			  "data": {
				"user": {
				  "displayName": "John Smith"
				}
			  }
			}));
		});

		let config = Config::new(server.url("/v1/graphql"), "secret".to_string());
		let user_repository = HasuraClient::new(&config);
		let user = user_repository.find_by_id(&user_id).await.unwrap();
		assert_eq!(user.id(), &user_id);
	}

	#[rstest]
	#[tokio::test]
	async fn test_find_by_id_not_found(unexisting_user_id: UserId) {
		let server = MockServer::start();
		server.mock(|when, then| {
			when.method(POST)
				.path("/v1/graphql")
				.body_contains(unexisting_user_id.to_string());
			then.status(200).json_body(json!({
			  "data": {
				"user": null
			  }
			}));
		});

		let config = Config::new(server.url("/v1/graphql"), "secret".to_string());
		let user_repository = HasuraClient::new(&config);
		let result = user_repository.find_by_id(&unexisting_user_id).await;
		assert!(result.is_err());
		assert_matches!(result, Err(UserRepositoryError::NotFound));
	}
}
