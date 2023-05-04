use std::collections::HashMap;

use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Default, Clone, Serialize, Deserialize, AsExpression, FromToSql, FromSqlRow)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub struct State {
	indexer_states: HashMap<String, Value>,
}

impl State {
	pub fn set<K: ToString, S: Serialize>(&mut self, key: K, state: S) -> serde_json::Result<()> {
		self.indexer_states.insert(key.to_string(), serde_json::to_value(state)?);
		Ok(())
	}

	pub fn get<S>(&mut self, key: &str) -> serde_json::Result<Option<S>>
	where
		for<'de> S: Deserialize<'de>,
	{
		let state = match self.indexer_states.get(key).cloned() {
			Some(state) => Some(serde_json::from_value(state)?),
			None => None,
		};

		Ok(state)
	}
}
