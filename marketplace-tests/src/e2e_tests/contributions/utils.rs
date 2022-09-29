use marketplace_core::dto::{Contribution, Project};

use crate::e2e_tests::projects;

pub fn find_by_issue_number(project: &Project, issue_number: u64) -> Option<Contribution> {
	project
		.contributions
		.iter()
		.find(|contribution| {
			contribution.github_link.split('/').last().unwrap().parse::<u64>().unwrap()
				== issue_number
		})
		.cloned()
}

pub async fn get_project_contribution_by_issue_number(
	project_name: &str,
	issue_number: u64,
) -> Option<Contribution> {
	let all_projects = projects::list().await;
	let starkonquest = projects::find_by_title(&all_projects, project_name)
		.expect("Project not found in list of all projects");
	find_by_issue_number(&starkonquest, issue_number)
}
