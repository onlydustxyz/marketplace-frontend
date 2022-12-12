use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;

use crate::*;

#[derive(Default, Debug, Clone, PartialEq, Eq, Constructor, Getters, Dissolve)]
pub struct Entity {
	id: UserId,
}

impl crate::Entity for Entity {
	type Id = UserId;
}
