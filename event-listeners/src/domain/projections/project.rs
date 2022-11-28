use super::Projection;
use domain::Entity;
use infrastructure::database::schema::projects;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, AsChangeset, new)]
pub struct Project {
	id: Uuid,
	name: String,
}

impl Entity for Project {
	type Id = Uuid;
}

impl Projection for Project {}
