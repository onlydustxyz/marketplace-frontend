use diesel::Identifiable;
use domain::{sponsor, ProjectId};
use infrastructure::database::schema::projects_sponsors;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, Serialize, Deserialize, Queryable, Identifiable, ImmutableModel,
)]
#[diesel(primary_key(project_id, sponsor_id))]
pub struct ProjectsSponsor {
	pub project_id: ProjectId,
	pub sponsor_id: sponsor::Id,
}

impl Identifiable for ProjectsSponsor {
	type Id = (ProjectId, sponsor::Id);

	fn id(self) -> Self::Id {
		(self.project_id, self.sponsor_id)
	}
}
