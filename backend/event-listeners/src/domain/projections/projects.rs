use diesel::Identifiable;
use domain::ProjectId;
use infrastructure::database::schema::projects;

#[derive(Debug, Insertable, Identifiable, Queryable, ImmutableModel)]
pub struct Project {
	pub id: ProjectId,
}

impl Identifiable for Project {
	type Id = ProjectId;

	fn id(self) -> Self::Id {
		self.id
	}
}
