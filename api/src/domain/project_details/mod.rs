mod entity;
pub use entity::Entity as ProjectDetails;

mod repository;
pub use repository::{
	Error as ProjectDetailsRepositoryError, Repository as ProjectDetailsRepository,
};
