use crate::domain::*;

pub trait Repository {
	fn store(&mut self, application: Application) -> Result<()>;
	fn find(&self, id: &ApplicationId) -> Result<Application>;
}
