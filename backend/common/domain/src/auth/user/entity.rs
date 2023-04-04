use derive_getters::Getters;
use derive_more::Constructor;

use crate::UserId;

#[derive(Debug, Constructor, Getters)]
pub struct User {
	id: UserId,
	display_name: String,
}
