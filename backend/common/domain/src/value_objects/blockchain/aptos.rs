use derive_more::{Display, From, FromStr, Into};
use serde::{Deserialize, Serialize};

use crate::blockchain;

#[derive(
	Debug, Copy, Clone, PartialEq, Eq, Serialize, Deserialize, From, Into, FromStr, Display,
)]
#[serde(transparent)]
pub struct Address(blockchain::Address<32>);
