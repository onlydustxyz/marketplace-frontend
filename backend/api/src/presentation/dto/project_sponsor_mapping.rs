use derive_more::Constructor;
use juniper::GraphQLObject;
use uuid::Uuid;

#[derive(GraphQLObject, Constructor)]
pub struct ProjectSponsorMapping {
	project_id: Uuid,
	sponsor_id: Uuid,
}
