use std::{fmt::Display, hash::Hash};

pub trait Entity {
	type Id: PartialEq + Eq + Display + Hash + Clone + Sync + Send;
}
