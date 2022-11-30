use super::Projection;
use domain::Entity;
use infrastructure::database::schema::projects;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, AsChangeset)]
pub struct Project {
	id: Uuid,
	name: String,
}

impl Project {
	pub fn new(id: Uuid, name: String) -> Self {
		Self { id, name }
	}
}

impl Entity for Project {
	type Id = Uuid;
}

impl Projection for Project {}
