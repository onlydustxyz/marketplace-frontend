use domain::{Entity, UserId};
use serde::{Deserialize, Serialize};

use crate::database::schema::contact_informations;

mod channel;
pub use channel::Channel;

#[derive(
	Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Queryable, Identifiable,
)]
#[diesel(primary_key(user_id))]
pub struct ContactInformation {
	pub user_id: UserId,
	pub channel: Channel,
	pub contact: String,
	pub public: bool,
}

impl Entity for ContactInformation {
	type Id = UserId;
}
