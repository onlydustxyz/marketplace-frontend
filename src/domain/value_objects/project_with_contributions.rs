use crate::domain::*;

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct ProjectWithContributions {
    pub project: Project,
    pub contributions: Vec<Contribution>,
}
