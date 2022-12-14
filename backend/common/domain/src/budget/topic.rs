use serde::{Deserialize, Serialize};

use crate::ProjectId;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Topic {
	Project(ProjectId),
}
