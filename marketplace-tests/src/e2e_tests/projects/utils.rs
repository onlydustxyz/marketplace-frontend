use marketplace_core::dto::{Contribution, Project};

use crate::e2e_tests::contributions;

pub fn find_by_title(projects: &[Project], title: &'static str) -> Option<Project> {
	projects.iter().find(|project| project.title == title).cloned()
}

pub fn find_open_contribution(projects: &[Project]) -> Option<Contribution> {
	projects
		.iter()
		.filter_map(|project| contributions::find_by_status(project, "OPEN"))
		.collect::<Vec<_>>()
		.pop()
}
