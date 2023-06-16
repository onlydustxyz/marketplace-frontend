mod repository;

use diesel::Identifiable;
use domain::UserId;
use infrastructure::database::{enums::ContactChannel, schema::contact_informations};
pub use repository::Repository;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Queryable, Identifiable, Model,
)]
#[diesel(primary_key(user_id, channel))]
pub struct ContactInformation {
	pub user_id: UserId,
	pub channel: ContactChannel,
	pub contact: String,
	pub public: bool,
}

impl Identifiable for ContactInformation {
	type Id = (UserId, ContactChannel);

	fn id(self) -> Self::Id {
		(self.user_id, self.channel)
	}
}
