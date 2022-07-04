use std::time::SystemTime;

pub type Id = String;

#[derive(Debug, PartialEq, Clone)]
pub struct Project {
    pub id: Id,
    pub owner: String,
    pub name: String,
}

#[derive(Debug, PartialEq, Clone)]
pub struct Filter {
    pub owner: Option<String>,
    pub name: Option<String>,
}

impl Default for Filter {
    fn default() -> Self {
        Self {
            owner: None,
            name: None,
        }
    }
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
