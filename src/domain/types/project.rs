use std::time::SystemTime;

pub type Id = String;

#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Project {
	pub id: Id,
	pub owner: String,
	pub name: String,
}

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct Filter {
	pub owner: Option<String>,
	pub name: Option<String>,
}

pub struct IndexingStatus {
	pub project_id: String,
	pub last_update_time: SystemTime,
}

impl IndexingStatus {
	pub fn new(id: String) -> Self {
		Self {
			project_id: id,
			last_update_time: SystemTime::now(),
		}
	}
}
