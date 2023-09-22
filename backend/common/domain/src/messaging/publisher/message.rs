use std::fmt::Debug;

use serde::{de::DeserializeOwned, Serialize};

pub trait Message: Serialize + DeserializeOwned + Debug + Clone {}

impl<T: Serialize + DeserializeOwned + Debug + Clone> Message for T {}
