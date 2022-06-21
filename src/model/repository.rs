use std::time::SystemTime;

#[derive(Debug, PartialEq, Clone)]
pub struct Repository {
    pub id: String,
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
    pub repository_id: String,
    pub last_update_time: SystemTime,
}

impl Default for IndexingStatus {
    fn default() -> Self {
        Self {
            repository_id: String::from(""),
            last_update_time: SystemTime::now(),
        }
    }
}

impl IndexingStatus {
    pub fn new(repository_id: String) -> Self {
        let mut status = Self::default();
        status.repository_id = repository_id.clone();
        status
    }
}
