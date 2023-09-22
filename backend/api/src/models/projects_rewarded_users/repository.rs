use diesel::{Connection, ExpressionMethods, RunQueryDsl};
use domain::{GithubUserId, ProjectId};
use infrastructure::{
	contextualized_error::IntoContextualizedError,
	database,
	database::{schema::projects_rewarded_users::dsl, Result},
};

use super::ProjectsRewardedUser;

pub trait Repository: database::ImmutableRepository<ProjectsRewardedUser> {
	fn increase_user_reward_count_for_project(
		&self,
		project_id: &ProjectId,
		user_id: &GithubUserId,
	) -> Result<()>;

	fn decrease_user_reward_count_for_project(
		&self,
		project_id: &ProjectId,
		user_id: &GithubUserId,
	) -> Result<()>;
}

impl Repository for database::Client {
	fn increase_user_reward_count_for_project(
		&self,
		project_id: &ProjectId,
		user_id: &GithubUserId,
	) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::insert_into(dsl::projects_rewarded_users)
			.values((
				dsl::project_id.eq(project_id),
				dsl::github_user_id.eq(user_id),
				dsl::reward_count.eq(1),
			))
			.on_conflict((dsl::project_id, dsl::github_user_id))
			.do_update()
			.set(dsl::reward_count.eq(dsl::reward_count + 1))
			.execute(&mut *connection)
			.err_with_context(format!(
				"increase_user_reward_count_for_project with project_id={project_id} and user_id={user_id}"
			))?;
		Ok(())
	}

	fn decrease_user_reward_count_for_project(
		&self,
		project_id: &ProjectId,
		user_id: &GithubUserId,
	) -> Result<()> {
		let mut connection = self.connection()?;
		connection
			.transaction::<_, diesel::result::Error, _>(|tx| {
				diesel::update(dsl::projects_rewarded_users)
					.set(dsl::reward_count.eq(dsl::reward_count - 1))
					.filter(dsl::project_id.eq(project_id))
					.filter(dsl::github_user_id.eq(user_id))
					.execute(&mut *tx)?;

				diesel::delete(dsl::projects_rewarded_users)
					.filter(dsl::project_id.eq(project_id))
					.filter(dsl::github_user_id.eq(user_id))
					.filter(dsl::reward_count.eq(0))
					.execute(&mut *tx)?;

				Ok(())
			})
			.err_with_context(format!(
				"decrease_user_reward_count_for_project with project_id={project_id} and user_id={user_id}"
			))?;
		Ok(())
	}
}
