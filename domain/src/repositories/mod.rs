mod user;
#[cfg(test)]
pub use user::MockRepository as MockUserRepository;
pub use user::{Error as UserRepositoryError, Repository as UserRepository};

mod mapping;
pub use mapping::Repository as MappingRepository;
