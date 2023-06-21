use diesel::{ExpressionMethods, RunQueryDsl};
use domain::UserId;
use infrastructure::{database, database::schema::user_profile_info::dsl};

use super::UserProfileInfo;

pub trait Repository: database::Repository<UserProfileInfo> {
	fn update_user_avatar(&self, id: UserId, avatar_url: String) -> database::Result<()>;
}

impl Repository for database::Client {
	fn update_user_avatar(&self, id: UserId, avatar_url: String) -> database::Result<()> {
		let mut connection = self.connection()?;
		diesel::update(dsl::user_profile_info)
			.set(dsl::avatar_url.eq(avatar_url))
			.filter(dsl::id.eq(id))
			.execute(&mut *connection)?;
		Ok(())
	}
}
