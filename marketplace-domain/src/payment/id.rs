use marketplace_wrappers::UuidWrapper;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize, UuidWrapper)]
pub struct Id(Uuid);
