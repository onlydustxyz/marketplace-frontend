use diesel::{ExpressionMethods, RunQueryDsl};
use domain::UserId;
use infrastructure::{database, database::schema::user_profile_info::dsl};

use super::UserProfileInfo;

pub trait Repository: database::Repository<UserProfileInfo> {
	fn upsert_user_avatar(&self, id: UserId, avatar_url: String) -> database::Result<()>;
}

impl Repository for database::Client {
	fn upsert_user_avatar(&self, id: UserId, avatar_url: String) -> database::Result<()> {
		let mut connection = self.connection()?;
		diesel::insert_into(dsl::user_profile_info)
			.values((dsl::id.eq(id), dsl::avatar_url.eq(avatar_url.clone())))
			.on_conflict(dsl::id)
			.do_update()
			.set(dsl::avatar_url.eq(avatar_url))
			.execute(&mut *connection)?;
		Ok(())
	}
}
