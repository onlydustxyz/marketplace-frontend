use crate::domain::*;

pub trait Repository {
    fn find_all_with_contributions(&self) -> Result<Vec<ProjectWithContributions>, Error>;
}
