use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};
use infrastructure::database::{schema::github_user_indexes::dsl, Client};

use crate::domain::{GithubUserIndexRepository, RepositoryResult};

impl GithubUserIndexRepository for Client {
	fn exists(&self, user_id: &domain::GithubUserId) -> RepositoryResult<bool> {
		let connection = self.connection()?;
		let exists = diesel::select(diesel::dsl::exists(
			dsl::github_user_indexes.filter(dsl::user_id.eq(user_id)),
		))
		.get_result(&*connection)?;
		Ok(exists)
	}

	fn try_insert(
		&self,
		user_id: &domain::GithubUserId,
		is_registered: bool,
	) -> RepositoryResult<()> {
		let connection = self.connection()?;
		diesel::insert_into(dsl::github_user_indexes)
			.values((
				dsl::user_id.eq(user_id),
				dsl::is_registered.eq(is_registered),
			))
			.on_conflict_do_nothing()
			.execute(&*connection)?;
		Ok(())
	}
}
