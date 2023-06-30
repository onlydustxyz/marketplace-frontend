use diesel::Identifiable;
use infrastructure::database::schema::technologies;

#[derive(Debug, Insertable, Identifiable, Queryable, ImmutableModel)]
#[diesel(table_name = technologies, primary_key(technology))]
pub struct Technology {
	pub technology: String,
}

impl Identifiable for Technology {
	type Id = String;

	fn id(self) -> Self::Id {
		self.technology
	}
}
