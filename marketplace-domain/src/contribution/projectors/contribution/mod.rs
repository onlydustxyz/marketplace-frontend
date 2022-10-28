#[allow(clippy::module_inception)]
mod github;
pub use github::GithubProjector as ContributionProjector;

#[cfg(test)]
mod test;
