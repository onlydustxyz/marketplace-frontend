use std::fmt::Display;

use diesel::Identifiable;

pub trait Entity {
	type Id: PartialEq + Display;
}

impl<'ident, T> Entity for &'ident T
where
	&'ident T: Identifiable,
	<&'ident T as Identifiable>::Id: Display,
{
	type Id = <Self as Identifiable>::Id;
}
