use std::fmt::Debug;

use olog::opentelemetry::propagation::Extractor;
use serde::{de::DeserializeOwned, Serialize};

pub trait Message: Extractor + Serialize + DeserializeOwned + Debug + Clone {}
pub trait Payload: Serialize + DeserializeOwned + Debug + Clone {}
