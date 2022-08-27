#[allow(clippy::module_inception)]
mod contribution_with_github_data_projector;
pub use contribution_with_github_data_projector::WithGithubDataProjector as ContributionProjector;

#[cfg(test)]
mod test;
