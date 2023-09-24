use derive_setters::Setters;
use diesel::{pg::Pg, Identifiable, Queryable};
use domain::ProjectId;
use infrastructure::database::{enums::ProjectVisibility, schema::project_details};
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Clone,
	Setters,
	Insertable,
	Serialize,
	Deserialize,
	AsChangeset,
	Identifiable,
	PartialEq,
	Eq,
	Model,
)]
#[diesel(table_name = project_details, primary_key(project_id), treat_none_as_null = true)]
#[setters(prefix = "with_")]
pub struct ProjectDetails {
	pub project_id: ProjectId,
	pub telegram_link: Option<String>,
	pub logo_url: Option<String>,
	pub name: String,
	pub short_description: String,
	pub long_description: String,
	pub hiring: bool,
	pub rank: i32,
	pub visibility: ProjectVisibility,
}

impl Identifiable for ProjectDetails {
	type Id = ProjectId;

	fn id(self) -> Self::Id {
		self.project_id
	}
}

impl<ST> Queryable<ST, Pg> for ProjectDetails
where
	(
		ProjectId,
		Option<String>,
		Option<String>,
		String,
		String,
		String,
		bool,
		i32,
		ProjectVisibility,
		String,
	): Queryable<ST, Pg>,
{
	type Row = <(
		ProjectId,
		Option<String>,
		Option<String>,
		String,
		String,
		String,
		bool,
		i32,
		ProjectVisibility,
		String,
	) as Queryable<ST, Pg>>::Row;

	fn build(row: Self::Row) -> diesel::deserialize::Result<Self> {
		let (
			project_id,
			telegram_link,
			logo_url,
			name,
			short_description,
			long_description,
			hiring,
			rank,
			visibility,
			_,
		) = Queryable::build(row)?;
		Ok(Self {
			project_id,
			telegram_link,
			logo_url,
			name,
			short_description,
			long_description,
			hiring,
			rank,
			visibility,
		})
	}
}
