mod repository;

use domain::{Entity, UserId};
use infrastructure::database::{enums::ContactChannel, schema::contact_informations};
pub use repository::Repository;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Queryable, Identifiable,
)]
#[diesel(primary_key(user_id))]
pub struct ContactInformation {
	pub user_id: UserId,
	pub channel: ContactChannel,
	pub contact: String,
	pub public: bool,
}

impl Entity for ContactInformation {
	type Id = UserId;
}
