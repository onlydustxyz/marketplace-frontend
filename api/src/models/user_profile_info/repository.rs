use diesel::{ExpressionMethods, RunQueryDsl};
use domain::UserId;
use infrastructure::{
	contextualized_error::IntoContextualizedError, database::schema::user_profile_info::dsl,
	dbclient,
};

use super::UserProfileInfo;

pub trait Repository: dbclient::Repository<UserProfileInfo> {
	fn upsert_user_avatar(&self, id: UserId, avatar_url: String) -> dbclient::Result<()>;
}

impl Repository for dbclient::Client {
	fn upsert_user_avatar(&self, id: UserId, avatar_url: String) -> dbclient::Result<()> {
		let mut connection = self.connection()?;
		diesel::insert_into(dsl::user_profile_info)
			.values((dsl::id.eq(id), dsl::avatar_url.eq(avatar_url.clone())))
			.on_conflict(dsl::id)
			.do_update()
			.set(dsl::avatar_url.eq(avatar_url.clone()))
			.execute(&mut *connection)
			.err_with_context(format!(
				"upsert user_profile_info set avatar_url={avatar_url} where id={id}"
			))?;
		Ok(())
	}
}
