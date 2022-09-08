use crate::{ContributorId, Projection};

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct Contributor {
	pub id: ContributorId,
}

impl Projection for Contributor {}
