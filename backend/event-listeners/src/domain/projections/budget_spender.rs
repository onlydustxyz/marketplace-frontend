use domain::{Budget, MappingRepository, User};

pub trait Repository: MappingRepository<Budget, User> {}
