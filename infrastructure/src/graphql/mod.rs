use domain::UserRepository;

pub struct GraphqlClient {}

impl UserRepository for GraphqlClient {
	fn find_by_id(&self, id: &domain::UserId) -> Result<domain::User, domain::UserRepositoryError> {
		//TODO: make a GraphQL query to hasura to get user data
		Ok(domain::User { id: *id })
	}
}
