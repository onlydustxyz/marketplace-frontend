use diesel::{ExpressionMethods, RunQueryDsl};
use domain::{GithubUserId, ProjectId};
use infrastructure::{
	database,
	database::{schema::projects_contributors::dsl, Result},
};

use super::ProjectsContributor;

pub trait Repository: database::Repository<ProjectsContributor> {
	fn link_project_with_contributor(
		&self,
		project_id: &ProjectId,
		user_id: &GithubUserId,
	) -> Result<()>;

	fn unlink_project_with_contributor(
		&self,
		project_id: &ProjectId,
		user_id: &GithubUserId,
	) -> Result<()>;
}

impl Repository for database::Client {
	fn link_project_with_contributor(
		&self,
		project_id: &ProjectId,
		user_id: &GithubUserId,
	) -> Result<()> {
		let mut connection = self.connection()?;
		diesel::insert_into(dsl::projects_contributors)
			.values((
				dsl::project_id.eq(project_id),
				dsl::github_user_id.eq(user_id),
				dsl::link_count.eq(1),
			))
			.on_conflict((dsl::project_id, dsl::github_user_id))
			.do_update()
			.set(dsl::link_count.eq(dsl::link_count + 1))
			.execute(&mut *connection)?;
		Ok(())
	}

	fn unlink_project_with_contributor(
		&self,
		project_id: &ProjectId,
		user_id: &GithubUserId,
	) -> Result<()> {
		let mut connection = self.connection()?;
		connection.build_transaction().run::<_, diesel::result::Error, _>(|tx| {
			diesel::update(dsl::projects_contributors)
				.set(dsl::link_count.eq(dsl::link_count - 1))
				.filter(dsl::project_id.eq(project_id))
				.filter(dsl::github_user_id.eq(user_id))
				.execute(&mut *tx)?;

			diesel::delete(dsl::projects_contributors)
				.filter(dsl::project_id.eq(project_id))
				.filter(dsl::github_user_id.eq(user_id))
				.filter(dsl::link_count.eq(0))
				.execute(&mut *tx)?;

			Ok(())
		})?;
		Ok(())
	}
}
