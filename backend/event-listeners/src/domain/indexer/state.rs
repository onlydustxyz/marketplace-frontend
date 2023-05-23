/// A wrapper struct for a `HashMap` that stores JSON values.
#[derive(Debug, Default, Clone, Serialize, Deserialize, AsExpression, FromToSql, FromSqlRow)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub struct State {
    /// The underlying `HashMap` that stores the JSON values.
    indexer_states: HashMap<String, Value>,
}

impl State {
    /// Sets the value of a key in the state.
    ///
    /// # Arguments
    ///
    /// * `key` - The key to set.
    /// * `state` - The value to set for the given key.
    ///
    /// # Errors
    ///
    /// Returns a `serde_json::Error` if the serialization of the state fails.
    pub fn set<K: ToString, S: Serialize>(&mut self, key: K, state: S) -> serde_json::Result<()> {
        self.indexer_states.insert(key.to_string(), serde_json::to_value(state)?);
        Ok(())
    }

    /// Gets the value of a key from the state.
    ///
    /// # Arguments
    ///
    /// * `key` - The key to get the value of.
    ///
    /// # Errors
    ///
    /// Returns a `serde_json::Error` if the deserialization of the state fails.
    pub fn get<S>(&self, key: &str) -> serde_json::Result<Option<S>>
    where
        for<'de> S: Deserialize<'de>,
    {
        let state = match self.indexer_states.get(key).cloned() {
            Some(state) => Some(serde_json::from_value(state)?),
            None => None,
        };

        Ok(state)
    }

    /// Merges two `State` structures together, returning a new `State` with the merged values.
    ///
    /// # Arguments
    ///
    /// * `self` - The first `State` to merge.
    /// * `other` - The second `State` to merge.
    pub fn merge(mut self, other: Self) -> Self {
        self.indexer_states.extend(other.indexer_states);
        self
    }
}