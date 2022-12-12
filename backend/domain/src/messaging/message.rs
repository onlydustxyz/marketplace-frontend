use chrono::{NaiveDateTime, Utc};
use derive_getters::Getters;
use serde::{de::DeserializeOwned, Deserialize, Serialize};
use serde_json::Value;
use std::fmt::Display;
use uuid::Uuid;

pub trait Message: Serialize + DeserializeOwned {}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Getters)]
pub struct UniqueMessage<P> {
	id: Uuid,
	timestamp: NaiveDateTime,
	metadata: Value,
	payload: P,
}

impl<P: Message> Message for UniqueMessage<P> {}

impl<P> UniqueMessage<P> {
	pub fn new(payload: P) -> Self {
		Self {
			id: Uuid::new_v4(),
			payload,
			timestamp: Utc::now().naive_utc(),
			metadata: Default::default(),
		}
	}
}

impl<P: Serialize> Display for UniqueMessage<P> {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(self).map_err(|_| std::fmt::Error)?
		)?;
		Ok(())
	}
}
