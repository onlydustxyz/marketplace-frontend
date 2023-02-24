use derive_more::Constructor;
use juniper::GraphQLObject;
use uuid::Uuid;

#[derive(GraphQLObject, Constructor)]
pub struct ProjectUserMapping {
	project_id: Uuid,
	user_id: Uuid,
}
