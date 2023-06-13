use std::collections::HashMap;

use derive_more::{From, Into};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, From, Into, Serialize, Deserialize)]
pub struct Languages(HashMap<String, i32>);

impl TryFrom<Languages> for serde_json::Value {
	type Error = serde_json::Error;

	fn try_from(value: Languages) -> Result<Self, Self::Error> {
		serde_json::to_value(value.0)
	}
}
