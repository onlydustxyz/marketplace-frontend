use crate::domain::*;

pub trait Repository {
	fn store(&self, application: Application) -> Result<()>;
	fn find(&self, id: &ApplicationId) -> Result<Application>;
}
