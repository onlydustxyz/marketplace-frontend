use crate::domain::{errors::Error, value_objects::ProjectWithContributions};

pub trait ProjectRepository {
    fn find_all_with_contributions(&self) -> Result<Vec<ProjectWithContributions>, Error>;
}
