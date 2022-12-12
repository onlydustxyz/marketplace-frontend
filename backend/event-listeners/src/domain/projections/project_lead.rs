use domain::{MappingRepository, Project, User};

pub trait Repository: MappingRepository<Project, User> {}
