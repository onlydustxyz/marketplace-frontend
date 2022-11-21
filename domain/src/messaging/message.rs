use serde::{de::DeserializeOwned, Serialize};

pub trait Message: Serialize + DeserializeOwned {}
