use crate::domain::*;

pub trait Repository {
	fn find_all_with_contributions(&self) -> AnyResult<Vec<ProjectWithContributions>>;
	fn store(&self, project: Project) -> AnyResult<()>;
}
