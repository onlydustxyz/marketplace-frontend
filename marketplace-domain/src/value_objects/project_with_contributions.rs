use crate::*;

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct ProjectWithContributions {
	pub project: Project,
	pub contributions: Vec<ContributionProjection>,
}
