use crate::HexPrefixedString;
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct Id(HexPrefixedString);
