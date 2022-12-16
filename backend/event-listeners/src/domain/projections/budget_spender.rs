use domain::{Budget, User};
use infrastructure::database::MappingRepository;

pub trait Repository: MappingRepository<Budget, User> {}
