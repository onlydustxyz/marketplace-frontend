use crate::*;

pub mod event;
#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Project;

impl Aggregate for Project {
	type Id = GithubProjectId;
}
