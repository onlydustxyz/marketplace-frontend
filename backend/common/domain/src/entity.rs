use std::fmt::Display;

pub trait Entity {
	type Id: PartialEq + Display;
}
