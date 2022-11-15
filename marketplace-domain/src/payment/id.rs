use derive_more::{Display, From};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Default, Clone, PartialEq, Eq, Serialize, Deserialize, Display, From)]
pub struct Id(Uuid);
