use super::{ContributionId, ContributorId};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use uuid_wrapper::UuidWrapper;

#[derive(
	Debug, JsonSchema, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Hash, UuidWrapper,
)]
pub struct Id(Uuid);

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, JsonSchema)]
pub struct Application {
	id: Id,
	contribution_id: ContributionId,
	contributor_id: ContributorId,
}

impl Application {
	pub fn new(id: Id, contribution_id: ContributionId, contributor_id: ContributorId) -> Self {
		Self {
			id,
			contribution_id,
			contributor_id,
		}
	}

	pub fn id(&self) -> &Id {
		&self.id
	}

	pub fn contribution_id(&self) -> &ContributionId {
		&self.contribution_id
	}

	pub fn contributor_id(&self) -> &ContributorId {
		&self.contributor_id
	}
}
