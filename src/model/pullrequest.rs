use std::fmt;

use super::repository::Repository;

pub enum Status {
    None = 0,
    Open = 1,
    Review = 2,
    Merged = 3,
    SmartContractError = 4,
}

pub struct PullRequest {
    pub id: String,
    pub author: String,
    pub status: Status,
}

pub struct Filter {
    pub repository: Repository,
}

impl fmt::Display for Status {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Status::None => write!(f, "0"),
            Status::Open => write!(f, "1"),
            Status::Review => write!(f, "2"),
            Status::Merged => write!(f, "3"),
            Status::SmartContractError => write!(f, "4"),
        }
    }
}
