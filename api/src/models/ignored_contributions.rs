use diesel::Identifiable;
use domain::ProjectId;
use infrastructure::database::schema::ignored_contributions;
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Clone,
	Insertable,
	Serialize,
	Deserialize,
	Queryable,
	Identifiable,
	ImmutableModel,
	PartialEq,
	Eq,
)]
#[diesel(primary_key(project_id, contribution_id))]
pub struct IgnoredContribution {
	pub project_id: ProjectId,
	pub contribution_id: String,
}

impl Identifiable for IgnoredContribution {
	type Id = (ProjectId, String);

	fn id(self) -> Self::Id {
		(self.project_id, self.contribution_id)
	}
}
